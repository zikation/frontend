import { NextResponse } from "next/server"

const BLOCKED_PREFIXES = [
    "/.well-known/appspecific"
]
  
const ALLOWED_EXACT = [
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico"
]
  
export function middleware(req) {
    const { pathname } = req.nextUrl
  
    if (ALLOWED_EXACT.includes(pathname)) {
        return NextResponse.next();
    }
  
    if (BLOCKED_PREFIXES.some(p => pathname.startsWith(p))) {
        return new NextResponse(null, { status: 404 })
    }
  
    return NextResponse.next()
}
  