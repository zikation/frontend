import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import RedirectOnError from "@/components/common/Error/RedirectOnError"
import SendWhatsAppMessage from "@/components/layout/ChatOnWhatsApp/WAUtils"
import SendGAEvent from "@/components/common/analytics/GAUtils"
import { Email } from '@/utils/constants'
import backend from "@/utils/backend"
import LoadingIndicator from "@/components/common/LoadingIndicator/LoadingIndicator"
import styles from './BookTrek.module.css'

const BookTrekPage = () => {
    const router = useRouter()
    const { slug, priceid} = router.query
    const [trek, setTrek] = useState(null)
    const [price, setPrice] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [ordering, setOrdering] = useState(false)

    useEffect(() => {
        if (!slug) return
    
        const fetchTrek = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${backend.runtimeTrekURL}/${slug}`)
                const data = await res.json()
    
                if (data?.err) {
                    setError(data?.str)
                    return
                }
    
                setTrek(data)
                const selectedPrice = data.price?.find(p => p._id === priceid)
                setPrice(selectedPrice || null)
            } 
            catch (err) {
                const message = `Could not get trek details: ${err}`
                setError(message)
            } 
            finally {
                setLoading(false)
            }
        }
    
        fetchTrek()
    }, [slug, priceid])

    if (loading)
        return <LoadingIndicator />

    if (error || !trek)
        return <RedirectOnError message='Oops! Something went wrong' buttonText='Go to Home Page' />
    
    const url = `/${trek.location}/${trek.sublocation}/treks/${slug}`
    if (!price)
        return <RedirectOnError message='Oops! Something went wrong' url={url} buttonText='Go to Trek Page' />

    if (success)
        return <RedirectOnError message={success} buttonText='Browse more treks' />

    return <BookTrekForm trek={trek} price={price} ordering={ordering} setError={setError} setSuccess={setSuccess} setOrdering={setOrdering} />
}

// 🛡️ Updated handleSubmit with anti-spam fields
const handleSubmit = async (e, setError, setSuccess, setOrdering, booking, formLoadedAt) => {
    e.preventDefault()
    setOrdering(true)

    const honeypotValue = e.target.honeypot.value

    // Client-side check (optional, backend should still verify)
    if (honeypotValue) {
        setOrdering(false)
        return setError("Spam detected.")
    }

    try {
        const res = await fetch(backend.runtimeOrderURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: booking,
                formLoadedAt,
                honeypot: honeypotValue
            }),
        })
        const data = await res.json()
        if (data.err)
            setError(data.str)
        else {
            setSuccess(data.msg)
            SendGAEvent('generate_lead', {
                event_category: 'engagement',
                event_label: 'trek_enquiry',
            })
        }
        
    } catch (e) {
        setError(e.message)
    } finally {
        setOrdering(false)
    }
}

const BookTrekForm = ({ trek, price, ordering, setError, setSuccess, setOrdering }) => {
    const formattedDate = new Date(price.batch?.date).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    })

    const prefix = [
        "Trek: " + trek.title,
        "Name: ",
        "Email ID: ",
        "Phone / WhatsApp Number: ",
        "Number of adults: ",
        "Preferred Date: " + formattedDate + ' (' + price.batch?.info + ') ',
        "Special Requests: "
    ]

    const bookingFormRef = useRef(null)
    const [booking, setBooking] = useState(prefix.join('\n'))
    const [formLoadedAt, setFormLoadedAt] = useState(Date.now())
    
    useEffect(() => {
        if (bookingFormRef.current) {
            bookingFormRef.current.focus()
            bookingFormRef.current.setSelectionRange(prefix[0].length, prefix[0].length)
        }
    }, [prefix])

    return (
        <div className={styles.BookTrek}>
            <h2>Booking {trek.title}</h2>
            <p>
                We do not have booking/payment integrated yet into our website. 
                Please fill the form so that we can get in touch with you, and guide you on booking the trek.
                Alternatively, you can send an email to us at <a href={`mailto:${Email}`}>{Email}</a>
            </p>

            <form onSubmit={e => handleSubmit(e, setError, setSuccess, setOrdering, booking, formLoadedAt)}>
                {/* 🕳️ Honeypot Field (hidden from users) */}
                <input type="text" name="honeypot" autoComplete="off" tabIndex="-1"
                    style={{ position: "absolute", left: "-9999px", opacity: 0 }} />

                {/* 🕒 Hidden timestamp field */}
                <input type="hidden" name="formLoadedAt" value={formLoadedAt} />

                <textarea className={styles.BookingFormTextArea} ref={bookingFormRef}
                    value={booking} rows="10" cols="50" name="text"
                    onChange={(e) => setBooking(e.target.value)} />
                <br />
                <button className={styles.BookTrekButton} type="submit" disabled={ordering}>Submit</button>
            </form>
            <button className={styles.WhatsAppButton} onClick={() => {SendWhatsAppMessage(null, booking)}}>Message on WhatsApp</button>  
        </div>
    )
}

BookTrekPage.background = '/images/booktrek.webp'

export default BookTrekPage