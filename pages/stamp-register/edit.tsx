import StampForm from "@/components/stamps/StampRegisterForm";
import { useRouter } from "next/router";

export default function StampEditPage() {
    const router = useRouter()
    const { proposal_no } = router.query;

    return (
        <StampForm
            proposalNo={proposal_no}
            pageType="edit"
        />
    );
}
