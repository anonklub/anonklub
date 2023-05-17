import { Web3Button } from '@web3modal/react'
import CustomButton from '@components/CustomButton'

export default function HomePage() {
  console.log('env', process.env)
  return (
    <>
      <Web3Button icon='show' label='Connect Wallet' balance='show' />
      <br />

      <CustomButton />
    </>
  )
}
