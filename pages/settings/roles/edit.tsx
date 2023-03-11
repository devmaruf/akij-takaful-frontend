import { useRouter } from 'next/router'

import RoleForm from "@/components/roles/RoleForm";

export default function EditPage() {
    const router = useRouter();
    const { id } = router.query;

    if (id !== undefined && isNaN(id)) {
        return router.push('/roles');
    }

    return (
        <RoleForm
            id={parseInt(id)}
            pageType="edit"
        />
    )
}