import { useRouter } from 'next/router'
import { ShowPages } from "@/utils/actions"

export default function Contact() {
    const router = useRouter()
    return <ShowPages router={router} page={"contact"} />
}