import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization')

  const validUser = 'admin'
  const validPass = '1234'

  if (!auth) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  const encoded = auth.split(' ')[1]
  const decoded = Buffer.from(encoded, 'base64').toString()
  const [user, pass] = decoded.split(':')

  if (user === validUser && pass === validPass) {
    return NextResponse.next()
  }

  return new Response('Access Denied', { status: 403 })
}