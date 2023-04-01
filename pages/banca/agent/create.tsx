import EmployeeForm from '@/components/employees/EmployeeForm';

export default function EmployeeCreatePage() {
    return (
        <EmployeeForm
            id={0}
            pageType='create'
            isAgent={true}
        />
    )
}