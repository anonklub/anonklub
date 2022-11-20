import { Controller, Get } from 'routing-controllers-extended'
import { Service } from 'typedi'

const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E2E ZK ECDSA QUERY API</title>
  </head>
  <body>
    <div>
      <h1>E2E ZK ECDSA JSON QUERY API</h1>
      <h2>Routes</h2>
      <table>
        <tr>
          <th>Method</th>
          <th>Route</th>
          <th>Response (as of last mainnet block)</th>
        </tr>
        <tr>
          <td>GET</td>
          <td>/anonymity-set/balance/ETH?min</td>
          <td>List of addresses that have at least <code>min</code> balance of ETH</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/anonymity-set/balance/ERC20?min&tokenAddress</td>
          <td>List of addresses that have at least <code>min</code> balance of a given ERC20</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/anonymity-set/beacon</td>
          <td>List of addresses that deposited into the Beacon Chain Deposit Contract</td>
        </tr><tr>
          <td>GET</td>
          <td>/anonymity-set/ens-proposal-voters?choice&id</td>
          <td>List of addresses that deposited voted <code>choice</code> for ENS proposal of ID <code>id</code> </td>
        </tr>
        </tr><tr>
          <td>GET</td>
          <td>/anonymity-set/punks</td>
          <td>List of addresses that own a cryptopunk</td>
        </tr>
      </table>
    </div>
    <hr>
    <footer>
      <a
        rel="stylesheet"
        target="_blank"
        href="https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa"
        >https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa</a
      >
    </footer>
  </body>
</html>
`

@Service()
@Controller()
export class HomeController {
  @Get('/')
  async home() {
    return html
  }
}
