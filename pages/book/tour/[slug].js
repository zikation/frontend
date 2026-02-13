import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import RedirectOnError from "@/travel-components/Error/RedirectOnError"
import { SendGAEvent, SendWhatsAppMessage } from "@/utils/actions"
import { Email } from '@/utils/constants'
import backend from "@/utils/backend"
import styles from './BookTour.module.css'
import Image from "next/image"
import LoadingIndicator from "@/travel-components/LoadingIndicator/LoadingIndicator"

export default function BookTourPage() {
    const router = useRouter()
    const { slug, priceid, location, sublocation } = router.query
    const [tour, setTour] = useState(null)
    const [price, setPrice] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [ordering, setOrdering] = useState(false)

    useEffect(() => {
        if (!slug || !priceid) return

        fetch(`${backend.fullTourDetailURL}/${slug}`)
            .then(res => res.json())
            .then(data => {
                if (data.err)
                    return setError(data.str)
                setTour(data)
                const customPrice = data.price?.custom?.find(p => p._id === priceid)
                const groupPrice = data.price?.group?.find(p => p._id === priceid)
                setPrice(customPrice || groupPrice || null)
            })
            .catch(err => {
                var message = 'Could not get tour details: ' + err
                setError(message)
            })
            .finally(() => setLoading(false))
    }, [slug, priceid, location, sublocation])

    const url = `/${location}/${sublocation}/tours/${slug}`
    if (error)
        return <RedirectOnError message={error} url={url} buttonText='Go to Tour Page' />

    if (loading)
        return <LoadingIndicator />

    if (!tour)
        return <RedirectOnError message='Oops! Something went wrong' buttonText='Go to Home Page' />

    if (!price)
        return <RedirectOnError message='Oops! Something went wrong' url={url} buttonText='Go to Tour Page' />

    if (success)
        return <RedirectOnError message={success} buttonText='Browse more tours' />

    return <BookTourForm tour={tour} price={price} ordering={ordering} setError={setError} setSuccess={setSuccess} setOrdering={setOrdering} />
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
        const res = await fetch(backend.orderURL, {
            method: "PUT",
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
            setSuccess(data.success)
            SendGAEvent('generate_lead', {
                event_category: 'engagement',
                event_label: 'tour_enquiry',
            })
        }
        
    } catch (e) {
        setError(e.message)
    } finally {
        setOrdering(false)
    }
}

function BookTourForm({ tour, price, ordering, setError, setSuccess, setOrdering }) {
    const formattedDate = new Date(price.batch?.date).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    })

    const customTourPrefix = [
        "Tour: " + tour.title,
        "Name: ",
        "Email ID: ",
        "Phone / WhatsApp Number: ",
        "Number of adults: " + price.adults,
        "Number of children: ",
        "Number of Travelers: ",
        "Age of each child: ",
        "No. of rooms needed: ",
        "Preferred Date: ",
        "Special Requests: "
    ]

    const groupTourPrefix = [
        "Tour: " + tour.title,
        "Name: ",
        "Email ID: ",
        "Phone / WhatsApp Number: ",
        "Number of adults: ",
        "Preferred Date: " + formattedDate + ' (' + price.batch?.info + ') ',
        "Special Requests: "
    ]

    const prefix = price.name ? customTourPrefix : groupTourPrefix
    const bookingFormRef = useRef(null)
    const [booking, setBooking] = useState(prefix.join('\n'))
    const [formLoadedAt, setFormLoadedAt] = useState(Date.now())
    const bkgd = '/background/booktour.webp'

    useEffect(() => {
        if (bookingFormRef.current) {
            bookingFormRef.current.focus()
            bookingFormRef.current.setSelectionRange(prefix[0].length, prefix[0].length)
        }
    }, [prefix])

    return (
        <div className={styles.BookTourWrapper}>
            <div className={styles.FullScreenBackground}>
                <Image
                    src={bkgd}
                    fill
                    alt="Booking Form"
                    priority
                    sizes="100vw"
                    className={styles.BackgroundImage}
                />
            </div>
            <main className={styles.BookTour}>
                <h2>Booking {tour.title}</h2>
                <p>
                    We do not have booking/payment integrated yet into our website. 
                    Please fill the form so that we can get in touch with you, and guide you on booking the tour.
                    Alternatively, you can send an email to us at <a href={`mailto:${Email}`}>{Email}</a>
                </p>

                <form onSubmit={e => handleSubmit(e, setError, setSuccess, setOrdering, booking, formLoadedAt)}>
                    {/* 🕳️ Honeypot Field (hidden from users) */}
                    <input
                        type="text"
                        name="honeypot"
                        autoComplete="off"
                        tabIndex="-1"
                        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                    />

                    {/* 🕒 Hidden timestamp field */}
                    <input type="hidden" name="formLoadedAt" value={formLoadedAt} />

                    <textarea
                        className={styles.BookingFormTextArea}
                        ref={bookingFormRef}
                        value={booking}
                        rows="10"
                        cols="50"
                        onChange={(e) => setBooking(e.target.value)}
                        name="text"
                    />
                    <br />
                    <button className={styles.BookTourButton} type="submit" disabled={ordering}>
                        Submit
                    </button>
                </form>
                <button className={styles.WhatsAppButton} onClick={() => {SendWhatsAppMessage(null, booking)}}>Message on WhatsApp</button>
            </main>
        </div>
    )
}
