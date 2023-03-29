import delay from 'delay'
import { writeFile } from 'fs'
import http from 'http'
import { PROVING_API_HOST } from './constants'
import { createProofRequest } from './create-proof-request'

export const fetchProof = async ({
  addresses,
  privateKey,
}: {
  addresses: string[]
  privateKey: string
}) => {
  console.log('Creating proof request')
  const proofRequest = await createProofRequest({
    addresses,
    privateKey,
  })

  await delay(300)
  console.log({
    addressIndex: proofRequest.addressIndex,
    msghash: proofRequest.msghash,
    pubkey: proofRequest.pubkey,
    signature: proofRequest.signature,
  })
  const body = proofRequest.stringify()
  await delay(300)
  console.log('Sending proof request to proving API')

  const options = {
    headers: {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'application/json',
    },
    host: PROVING_API_HOST,
    method: 'POST',
    path: '/',
    port: 3000,
  }

  const req = http.request(options, function (res) {
    let response = ''

    res.setEncoding('utf8')
    res.on('data', function (chunk: string) {
      response += chunk
    })
    res.on('end', function () {
      console.log('proof: ' + response)
      // write response to json file
      writeFile('proof.json', response, (err) => {
        if (err !== null) {
          console.log(err)
        } else {
          console.log('proof.json written')
        }
      })
    })
  })

  req.write(body)
  req.end()

  // TODO: this time out, use messaging queue
  // const response = await fetch(URLS.PROVING_API, {
  //   body,
  //   headers: {
  //     'Content-Length': Buffer.byteLength(body).toString(),
  //     'Content-Type': 'application/json',
  //   },
  //   method: 'POST',
  // })
  //
  // return response.json()
}
