import { useRouter } from 'next/router'
import { ShowPages } from "@/utils/actions"

export default function PrivacyPolicy() {
    const router = useRouter()
    return <ShowPages router={router} page={"privacy"} />
}