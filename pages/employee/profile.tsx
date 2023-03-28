import EmployeeForm from '@/components/employees/EmployeeForm';
import { getAuthData } from '@/utils/auth';

export default function EmployeeEditPage() {
  const id = getAuthData()?.id;

  return (
    <EmployeeForm
      id={typeof id === undefined || id === null ? 0 : parseInt(id + '')}
      pageType='profile'
    />
  )
}