import { useRouter } from 'next/router';
import { UnderwritingCreate } from '@/components/under-writing/UnderwritingCreate';

export default function UnderWritingPage() {
    const router = useRouter()
    const { id } = router.query;

    return  <UnderwritingCreate id={parseInt(id + '')} />
}