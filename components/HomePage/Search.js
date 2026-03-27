import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/router"
import backend from "@/utils/backend"
import styles from './Home.module.css'

export default function TourSearch() {
    const router = useRouter()
    const [query, setQuery] = useState("")
    const [allTags, setAllTags] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef(null)
    const dropdownRef = useRef(null)
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })

    // Fetch all tags once when user types first letter
    useEffect(() => {
        if (query.length !== 1 || allTags.length > 0) return

        const fetchTags = async () => {
            const errText = "Failed to get the list of valid search elements: "
            try {
                const res = await fetch(backend.runtimeTagsURL)
                if (!res.ok) {
                    console.error(`${errText} ${res.status}`)
                    setAllTags([])
                    return
                }

                const data = await res.json()
                if (data.tags && Array.isArray(data.tags)) {
                    setAllTags(data.tags)
                } else {
                    setAllTags([])
                }

            } catch (err) {
                console.error(`${errText} ${err}`)
                setAllTags([]) // prevents retry loop
            }
        }

        fetchTags()
    }, [query])

    // Filter suggestions locally
    useEffect(() => {
        if (query.length > 0 && allTags.length > 0) {
            const q = query.toLowerCase()
            const filtered = allTags
            .filter(tag => tag.toLowerCase().includes(q))
            .sort((a, b) =>
                (b.toLowerCase().startsWith(q) - a.toLowerCase().startsWith(q)) ||
                a.localeCompare(b)
            )
            setSuggestions(filtered)
            setShowSuggestions(filtered.length > 0)
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }, [query, allTags])

    // Track input position for floating dropdown
    useEffect(() => {
        if (showSuggestions && inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect()
            setDropdownPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            })
        }
    }, [showSuggestions])

    // Close dropdown on click outside input and dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Close dropdown on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowSuggestions(false)
        }
    
        document.addEventListener("scroll", handleScroll, true)
    
        return () => document.removeEventListener("scroll", handleScroll, true)
    }, [])

    const handleSearch = (searchTerm) => {
        const term = searchTerm || query
        if (!term) return
        router.push(`/search/${encodeURIComponent(term)}`)
    }

    return (
        <div className={styles.SearchContainer}>
            <div className={styles.SearchBoxWrapper}>
                <input type="text" ref={inputRef} value={query} className={styles.SearchInput}
                    placeholder="Search tours, treks and more..."
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            handleSearch()
                        }
                    }}
                />
                <button
                    onClick={() => handleSearch()} className={styles.SearchButton}
                    disabled={query.trim() === "" || suggestions.length === 0}
                >
                    Search
                </button>
            </div>

            {/* Floating suggestions via portal */}
            {showSuggestions && suggestions.length > 0 && createPortal(
                <div
                    ref={dropdownRef}
                    style={{
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                        position: "absolute",
                        maxHeight: "200px",
                        overflowY: "auto",
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 9999
                    }}
                >
                    {suggestions.map(tag => (
                        <div
                            key={tag}
                            className={styles.SuggestionItem}
                            onClick={() => handleSearch(tag)}
                        >
                            {tag.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    )
}
