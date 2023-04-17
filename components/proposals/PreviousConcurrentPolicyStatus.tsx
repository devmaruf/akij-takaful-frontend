import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import ConcurrentProposal from "./ConcurrentProposal";
import PreviousPolicies from "./PreviousPolicies";

export function PreviousConcurrentPolicyStatus() {
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const personalInformation = proposalInput.proposal_personal_information;

  return (
    <div className="border border-gray-200 mt-3 p-2.5 rounded-md shadow-md">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
        Previous Policy & Concurrent Policy Status
      </h3>

      <ConcurrentProposal
        phoneNo={personalInformation?.mobile_no}
        idType={personalInformation?.identity_type}
        idNo={personalInformation?.id_no}
        proposalId={proposalInput?.id}
      />

      <hr />

      <PreviousPolicies
        phoneNo={personalInformation?.mobile_no}
        idType={personalInformation?.identity_type}
        idNo={personalInformation?.id_no}
        proposalId={proposalInput?.id}
      />
    </div>
  );
}
