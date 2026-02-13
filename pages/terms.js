import { useRouter } from 'next/router'
import { ShowPages } from "@/utils/actions"

export default function TermsAndConditions() {
    const router = useRouter()
    return <ShowPages router={router} page={"tnc"} />
}