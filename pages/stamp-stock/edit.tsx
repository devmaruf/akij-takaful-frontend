import StampStockForm from "@/components/stamp-stocks/StampStockForm";
import { useRouter } from "next/router";

export default function StampStockEditPage() {
    const router = useRouter()
    const { id } = router.query;

    return (
        <StampStockForm
            id={parseInt(id + '')}
            pageType="edit"
        />
    );
}
