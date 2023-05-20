import MedicalTestsForm from '@/components/medical/MedicalTestForm';
import { useRouter } from 'next/router';

export default function MedicalTestEditPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MedicalTestsForm
      id={typeof id === undefined || id === null ? 0 : parseInt(id + '')}
      pageType='edit'
    />
  )
}