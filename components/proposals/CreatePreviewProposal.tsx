import { useRouter } from "next/router";
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux";

import { createPreviewProposalAndRedirectAction } from "@/redux/actions/proposal-action";
import Loading from "@/components/loading";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContent } from "@/components/layouts/PageContent";

export default function CreatePreviewProposal() {
    const router = useRouter();
    const dispatch = useDispatch();
    const dispatchRef = useRef(dispatch);

    useEffect(() => {
        if (dispatch !== dispatchRef.current) {
            dispatchRef.current = dispatch;
        } else {
            dispatch(createPreviewProposalAndRedirectAction(router));
        }
    }, [dispatch]);

    return (
        <div>
            <PageHeader
                title='Create unique proposal no'
                hasSearch={false}
            />

            <PageContent>
                <Loading loadingTitle="Proposal" />
            </PageContent>
        </div>
    )
}