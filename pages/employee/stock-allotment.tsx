import EmployeeStampStockAllocateForm from "@/components/stamp-stocks/EmployeeStampAllocateForm";
import { useRouter } from "next/router";

export default function EmployeeStampStockAllotmentPage() {
    const router = useRouter()
    const { employee_id } = router.query;

    return (
        <EmployeeStampStockAllocateForm
            employeeId={parseInt(employee_id + '')}
        />
    );
}
