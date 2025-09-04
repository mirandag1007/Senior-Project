import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function updateSession(req: NextRequest) {
  const res  = NextResponse.next()
  const supa = createMiddlewareClient({ req, res })

  // 1️⃣ refresh the session if a refresh token is present
  const {
    data: { session },
  } = await supa.auth.getSession()

  // 2️⃣ require auth on protected routes
  const protectedRoute =
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/transcribe')

  if (protectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res          // allow request to continue
}
