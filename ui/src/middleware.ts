import { config as appConfig } from '#/config'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get(appConfig.auth.header)
  if (authHeader === appConfig.auth.secret) return NextResponse.next()

  return new NextResponse(null, { status: 403, statusText: 'Unauthorized' })
}

export const config = {
  matcher: '/api/verify',
}
