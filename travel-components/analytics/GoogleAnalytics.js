import Script from 'next/script'

export default function GoogleAnalytics({ id }) {
    if (!id) return null

    return (
        <>
            {/* Load gtag script */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
                strategy="afterInteractive"
            />

            {/* Initialize gtag */}
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${id}', {
                    page_path: window.location.pathname,
                });
                `}
            </Script>
        </>
    )
}
