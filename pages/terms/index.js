import { useRouter } from 'next/router'
import ShowPolicyPages from '@/components/layout/Footer/ShowPolicyPages'

export default function TermsAndConditions() {
    const router = useRouter()
    return <ShowPolicyPages router={router} page={"tnc"} />
}