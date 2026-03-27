import RedirectOnError from "@/components/common/Error/RedirectOnError"

export default function SearchResults() {
    const str = "You haven't specified any place to search"
    return <RedirectOnError message={str} />
}
