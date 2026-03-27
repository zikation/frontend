import { useRouter } from 'next/router'
import ShowPolicyPages from '@/components/layout/Footer/ShowPolicyPages'

export default function PrivacyPolicy() {
    const router = useRouter()
    return <ShowPolicyPages router={router} page={"privacy"} />
}