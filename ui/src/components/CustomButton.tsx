'use client'
import { useWeb3Modal } from '@web3modal/react'
import { useEffect, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { Loader } from '@/components/Loader'

export function CustomButton() {
  // to avoid hydration errors
  // (content rendered by React on the client-side doesn't match the HTML sent from the server)
  // here label depends on the client side state which is known only after the component is mounted
  const [hasMounted, setHasMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const label = isConnected ? 'Disconnect' : 'Connect'

  useEffect(() => {
    setHasMounted(true)
  }, [])

  async function onOpen() {
    setLoading(true)
    await open()
    setLoading(false)
  }

  function onClick() {
    if (isConnected) {
      disconnect()
    } else {
      onOpen().catch(console.error)
    }
  }

  return hasMounted ? (
    <button className='btn btn-connect' onClick={onClick} disabled={loading}>
      {loading ? 'Loading...' : label}
    </button>
  ) : (
    Loader
  )
}
