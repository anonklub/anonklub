import * as spartanEcdsaWasm from '@anonklub/spartan-ecdsa-wasm'
import { type NextRequest, NextResponse } from 'next/server'
// import { config } from '~'

let initialized = false

function maybePrepare() {
  spartanEcdsaWasm.init_panic_hook()
  if (initialized) return
  spartanEcdsaWasm.prepare()
  initialized = true
}

export async function POST(request: NextRequest) {
  // TODO: add origin check in a middleware
  // const origin = request.headers.get('origin')
  // if (origin !== config.discordUrl) return NextResponse.error()
  maybePrepare()
  const proof = new Uint8Array(await request.arrayBuffer())
  return NextResponse.json(spartanEcdsaWasm.verify_membership(proof))
}
