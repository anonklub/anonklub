import http from 'http'
import { ProofRequest } from '@e2e-zk-ecdsa/shared/src/ProofRequest'

const proofRequest = new ProofRequest({
  addresses: [
    '0x56F6608C4D012b4e4095403C7f19a2B2FA5cb019',
    '0x765f698a308Fb5201De91e8f6304dc3e2A61Bc72',
    '0x312e3FcB7d984Ea8E18cD64cBfaa266CBa9Cd3b3',
    '0x968C32dDd80716E8CFDCCbe62967CCb86BDD02D5',
    '0x95351d3536620049f499C17d81B1e1580270b96C',
    '0x62f9b49aEE1e2f2C114cA8d7f57919C825e4E518',
    '0xC0A1fD7848aeD745591B87EC0518EA93AB052d1B', // <<<<<<<<<<<<<<<<<<<<<<
    '0x06D48A1Ee2eb464eAA25b991BDC1f902BF48a819',
    '0xE9dA6711bC0ae88233B73430271037c477B271Aa',
    '0x276b024F257ac4AA23b2A40a84d2CEd696F285d4',
    '0x1E5D40E7A78E0B6FBABBD217906D019a4a52bf49',
  ],
  message: 'Hello World',
  rawSignature:
    '0x737515055c70100f2326fa93db00c2b22a0eb267267c542fc3838d35bed782c3252e2d926e8dfddb0f622caa2004eb7138a9ec70a59c41f3eb034ec4f91e3fc31c',
}).serialize()

const options = {
  headers: {
    'Content-Length': Buffer.byteLength(proofRequest),
    'Content-Type': 'application/json',
  },
  host: 'localhost',
  method: 'POST',
  path: '/',
  port: 3000,
}

const req = http.request(options, function (res) {
  res.setEncoding('utf8')
  res.on('data', function (chunk: string) {
    console.log('BODY: ' + chunk)
  })
})

req.write(proofRequest)
req.end()
