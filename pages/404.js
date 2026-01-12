import FullScreenOverlay from "@/travel-components/FullScreenOverlay/FullScreenOverlay"
import Link from "next/link"

export default function Custom404() {
    return (
        <FullScreenOverlay showClose={false}>
            <div className="Error404Content">
                <p>Oops! How did you land here?</p>
                <p>The link you clicked/touched is wrong. It&apos;s our issue. Sorry!</p>
                <p>Or you may have typed a wrong URL. If yes, you can double check the same.</p>
                <p>In any case, you can search for tours in our homepage.</p>
                <Link href='/'><strong>Go to Homepage</strong></Link>
            </div>
         </FullScreenOverlay>
    )
}