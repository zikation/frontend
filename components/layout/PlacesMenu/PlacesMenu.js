import { useState, useEffect, useRef } from "react"
import styles from './PlacesMenu.module.css'
import backend from "@/utils/backend"
import { PlacesMenuDetails } from "@/utils/PlacesMenuDetails"
import Link from "next/link"

function getPlaceLabel(locKey, subKey) {
    if (!locKey) return ""
  
    // Lookup parent location
    const loc = PlacesMenuDetails[locKey]
    if (!loc) return locKey
  
    if (!subKey) return loc.label || locKey
  
    // Lookup sublocation
    return loc.sublocations?.[subKey]?.label || subKey
}

function ShowSubLocations({menuitem}) {
    return (
        menuitem.sublocations.length > 0 && (
            <ul className={styles.PlacesMenuSubLocationUL}>
            {
                menuitem.sublocations.map((sl, i) => {
                    const subLabel = getPlaceLabel(menuitem.location, sl.sublocation)
                    return (
                        <li className={styles.PlacesMenuSubMenuItem} key={i}>
                            <Link href={`/${menuitem.location}/${sl.sublocation}`}>
                                {subLabel} ({sl.count})
                            </Link>
                        </li>
                    )
                })
            }
            </ul>
        )
    )
}

function ShowMiniMenu({}) {
    return (
        <div className={styles.PlacesMenuMiniContainer}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

function ShowMenuItem({menuitem}) {
    var location = PlacesMenuDetails[menuitem.location]
    return (
        <li className={styles.PlacesMenuLocationItem}>
            <div className={styles.PlacesMenuMainContainer}>
                <Link className={styles.PlacesMenuLocation} href={`/${menuitem.location}`}>
                    {location.label + " (" + menuitem.totalCount + ")"}
                </Link>
                <ShowSubLocations menuitem={menuitem} />
            </div>
        </li>
    )
}

function ShowFullMenu({menu}) {
    return (
        <nav className={styles.PlacesMenuNav}>
            <ul className={styles.PlacesMenuLocationUL}>
                {
                    menu.map((m, i) => {
                        return <ShowMenuItem key={i} menuitem={m} />
                    })
                }
            </ul>
        </nav>
    )
}

export default function PlacesMenu() {
    const [menu, setMenu] = useState([])
    const [menuExpanded, setMenuExpanded] = useState(false)
    const [isTouchMode, setIsTouchMode] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        async function GetPlacesMenu() {
            try {
                const res = await fetch(`${backend.runtimeMenuURL}`)
                if (!res.ok) throw new Error("Failed to fetch menu")
                const data = await res.json()
                if (data.str) throw new Error(data.str)
                setMenu(data.menu || [])
            } catch (e) {
                console.error(e)
            }
        }
        GetPlacesMenu()
    }, [])

    useEffect(() => {
        function handleClickOutside(e) {
            // If menu is NOT expanded, no need to check anything
            if (!menuExpanded) return
      
            // If click happened inside the menu, ignore it
            if (menuRef.current && menuRef.current.contains(e.target)) {
                return
            }
      
            // Otherwise collapse the menu
            setMenuExpanded(false)
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
      }, [menuExpanded])      

    useEffect(() => {
        const checkMode = () => {
            // You can adjust 1024 → 900 or 768 depending on your design
            setIsTouchMode(window.innerWidth <= 1024)
        };
        checkMode()
        window.addEventListener("resize", checkMode)
        return () => window.removeEventListener("resize", checkMode)
      }, [])

    if (!menu || !Array.isArray(menu) || menu.length <= 0) return null

    return (
        <aside ref={menuRef} className={menuExpanded ? styles.PlacesMenuExpanded : styles.PlacesMenu} 
            onMouseEnter={() => setMenuExpanded(true)} onMouseLeave={() => setMenuExpanded(false)}
            onClick={(e) => {e.stopPropagation();  setMenuExpanded(!menuExpanded)}}>
            {
                !menuExpanded ? <ShowMiniMenu /> : <ShowFullMenu menu={menu} />
            }
        </aside>
    )
}