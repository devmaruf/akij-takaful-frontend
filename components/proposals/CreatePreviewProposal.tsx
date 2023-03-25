import { useRouter } from "next/router";
import { useEffect, useCallback } from "react"
import React, { useDispatch } from "react-redux";
import { debounce } from "lodash";

import { createPreviewProposalAndRedirectAction } from "@/redux/actions/proposal-action";
import Loading from "@/components/loading";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContent } from "@/components/layouts/PageContent";

export default function CreatePreviewProposal() {
    const router = useRouter();
    const dispatch = useDispatch();

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(createPreviewProposalAndRedirectAction(router));
        }, 2000),
        []
    );

    useEffect(() => {
        debouncedDispatch(); // call debounced dispatch function
        return debouncedDispatch.cancel; // cleanup the debounced function
    }, [debouncedDispatch]);

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