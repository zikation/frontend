import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="en">
        <Head>
            <link rel="icon" href="/meta/favicon.ico" />
            <link rel="manifest" href="/meta/manifest.json" />
            <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />
            <link rel="apple-touch-icon" href="/meta/apple-touch-icon.png" />
            <meta name="theme-color" content="#000000" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
        </Html>
    )
}
