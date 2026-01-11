import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/router"
import backend from "@/utils/backend"
import styles from './TourSearch.module.css'

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
        if (query.length === 1 && allTags.length === 0) {
            fetch(backend.tagsURL)
                .then(res => res.json())
                .then(data => {
                    if (data.tags && Array.isArray(data.tags)) {
                        setAllTags(data.tags)
                    } else {
                        setAllTags([])
                    }
                })
                .catch(err => console.error("Failed to fetch tags:", err))
        }
    }, [query, allTags])

    // Filter suggestions locally
    useEffect(() => {
        if (query.length > 0 && allTags.length > 0) {
            const filtered = allTags.filter(tag =>
                tag.toLowerCase().startsWith(query.toLowerCase())
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

    const handleSearch = (searchTerm) => {
        const term = searchTerm || query
        if (!term) return
        router.push(`/search/${encodeURIComponent(term)}`)
    }

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBoxWrapper}>
                <input
                    type="text"
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            handleSearch()
                        }
                    }}
                    placeholder="Search tours..."
                    className={styles.searchInput}
                />
                <button
                    onClick={() => handleSearch()}
                    className={styles.searchButton}
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
                            className={styles.suggestionItem}
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
