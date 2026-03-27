const SendGAEvent = (type, eventProps) => {
    if (window.gtag) {
        window.gtag('event', type, eventProps)
    }
}

export default SendGAEvent