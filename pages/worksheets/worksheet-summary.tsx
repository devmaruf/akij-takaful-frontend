import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { RootState } from "@/redux/store";
import { getProposalDetails } from "@/redux/actions/proposal-action";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContentList } from "@/components/layouts/PageContentList";
import Loading from "@/components/loading";
import { OfficeInformation } from "@/components/proposals/OfficeInformation";
import { PolicyInformation } from "@/components/proposals/PolicyInformation";
import { SupplementaryRider } from "@/components/proposals/SupplementaryRider";
import { ExtraLoading } from "@/components/proposals/ExtraLoading";
import { ExistingPolicy } from "@/components/proposals/ExistingPolicy";
import { ProposerPersonalInformation } from "@/components/proposals/ProposerPersonalInformation";
import { OtherInformation } from "@/components/proposals/OtherInformation";
import { UnderwritingDecision } from "@/components/proposals/UnderwritingDecision";
import Button from "@/components/button";

export default function WorksheetSummary() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { proposalDetails, loadingDetails } = useSelector((state: RootState) => state.proposal);


  const debouncedDispatch = useCallback(
    debounce(() => {
      dispatch(getProposalDetails(id))
    }, 2000),
    [id]
  );

  const divRef = useRef(null);

  const handlePrint = () => {
    const printContents = divRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };


  useEffect(() => {
    debouncedDispatch();
    return debouncedDispatch.cancel;
  }, [debouncedDispatch]);

  return (
    <div>
      <PageHeader
        title="Worksheet Summary"
        hasSearch={false}
      />
      <div className="mt-4 mr-4 p-0">
        <Button variant="success" onClick={handlePrint}>
          <i className="bi bi-printer"></i> Print
        </Button>
      </div>
      <PageContentList>
        {
          loadingDetails ?
            <div className="text-center">
              <Loading loadingTitle="Worksheet summary" />
            </div>
            :
            <div className="printDiv" ref={divRef}>
              <div>
                <OfficeInformation data={proposalDetails} />
                <PolicyInformation data={proposalDetails} />
                <SupplementaryRider data={proposalDetails} />
                <ExtraLoading data={proposalDetails} />
                <ExistingPolicy data={proposalDetails} />
                <ProposerPersonalInformation data={proposalDetails} />
                <OtherInformation data={proposalDetails} />
                <UnderwritingDecision data={proposalDetails} />
                <p className="text-left text-slate-800 text-xl font-semibold mt-8">Worksheet Done By Admin & 2020000000005</p>
              </div>
            </div>
        }
      </PageContentList>
    </div>
  );
}
