import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import TourListPage from "@/travel-components/TourListPage/TourListPage"
import backend from "@/utils/backend"

export default function SearchPlace() {
    const router = useRouter()
    const [results, setResults] = useState(null)
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
                const res = await fetch(`${backend.searchTourURL}/${encodeURIComponent(searchQuery)}`)
                if (!res.ok) throw new Error("Failed to fetch tours")
                const data = await res.json()
                setResults(data)
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
    if (loading) return <p>{`Loading tours for "${searchQuery}"...`}</p>
    if (error) return <p>Error: {error}</p>
    if (!results?.tours) return <p>{`No tours found for "${searchQuery}"`}</p>

    return <TourListPage tours={results.tours} search={searchQuery} />
}
