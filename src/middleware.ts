import { usePathname } from 'next/navigation';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. Specify protected and public routes
const protectedRoutes = ['/main']
const publicRoutes = ['/auth/login', '/signup'];

export function middleware(request: NextRequest) {

  // 2. Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  const path = request.nextUrl.pathname
  // const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  // Your middleware logic here
  const jwtToken = request.cookies.get('jwtTokenDataMusic');


  if (!jwtToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  if (
    isPublicRoute &&
    jwtToken &&
    !request.nextUrl.pathname.startsWith('/main')
  ) {
    return NextResponse.redirect(new URL('/main', request.nextUrl))
  }
  // Example: Add custom headers
  const response = NextResponse.next()
  return response
}

// Optional: Configure on which paths to run the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}