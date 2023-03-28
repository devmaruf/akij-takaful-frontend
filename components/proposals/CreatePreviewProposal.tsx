import { useRouter } from "next/router";
import React, { useDispatch } from "react-redux";

import { createPreviewProposalAndRedirectAction } from "@/redux/actions/proposal-action";
import Loading from "@/components/loading";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContent } from "@/components/layouts/PageContent";
import { useDebounced } from "@/hooks/use-debounce";

export default function CreatePreviewProposal() {
    const router = useRouter();
    const dispatch = useDispatch();

    useDebounced(() => {
        dispatch(createPreviewProposalAndRedirectAction(router));
    });

    return (
        <div>
            <PageHeader
                title='New Proposal'
                hasSearch={false}
            />

            <PageContent>
                <div className="text-center">
                    <Loading loadingTitle="Proposal" />
                </div>
            </PageContent>
        </div>
    )
}