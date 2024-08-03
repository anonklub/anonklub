import { verifier } from '#/verifier'
import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  // TODO: add origin check in a middleware
  // const origin = request.headers.get('origin')
  // if (origin !== config.discordUrl) return NextResponse.error()
  const proof = new Uint8Array(await request.arrayBuffer())
  const result = await verifier.verifyMembership(proof)
  return NextResponse.json(result)
}
