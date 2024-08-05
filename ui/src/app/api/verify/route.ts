import { verifier } from '#/verifier'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const proof = new Uint8Array(await request.arrayBuffer())
  const result = await verifier.verifyMembership(proof)
  return NextResponse.json(result)
}
