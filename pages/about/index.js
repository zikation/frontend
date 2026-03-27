import { useRouter } from 'next/router'
import ShowPolicyPages from '@/components/layout/Footer/ShowPolicyPages'

export default function About() {
    const router = useRouter()
    return <ShowPolicyPages router={router} page={"about"} />
}