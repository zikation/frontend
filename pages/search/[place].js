import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import backend from "@/utils/backend"
import LoadingIndicator from "@/components/common/LoadingIndicator/LoadingIndicator"
import ListPage from "@/components/common/ListPage/ListPage"
import RedirectOnError from "@/components/common/Error/RedirectOnError"

export default function SearchPlace() {
    const router = useRouter()
    const [results, setResults] = useState({tags: []})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const searchQuery = router.query.place

    // Fetch results whenever searchQuery changes
    useEffect(() => {
        if (!router.isReady || !searchQuery) return

        setLoading(true)
        setError(null)

        const fetchResults = async () => {
            try {
                const res = await fetch(`${backend.runtimeSearchURL}/${encodeURIComponent(searchQuery)}`)
                if (!res.ok) {
                    setResults({tags: []})
                } else {
                    const data = await res.json()
                    setResults(data)
                }
            } catch (err) {
                console.error(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [router.isReady, searchQuery])

    if (!router.isReady) return <p>Initializing search...</p>
    if (loading) return <LoadingIndicator />
    if (error) return <RedirectOnError message={`Error: ${error}`} buttonText="Go to Homepage" />

    return <ListPage categories={results.categories} search={searchQuery}  />
}
