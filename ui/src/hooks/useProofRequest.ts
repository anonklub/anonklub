import { ProofRequest } from '@anonklub/proof'
import {
  MembershipProver, MerkleProof, Poseidon, Tree, defaultPubkeyMembershipPConfig
} from "@personaelabs/spartan-ecdsa";
import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { config } from '#'
import { useStore } from './useStore'

export const useProofRequest = () => {
  const { isConnected } = useAccount()
  const { anonSet, proofRequest, setProofRequest } = useStore()
  const [message, setMessage] = useState('')
  const {
    data: rawSignature,
    isError,
    isLoading,
    isSuccess,
    reset,
    signMessage,
  } = useSignMessage({
    message,
  })

  useEffect(() => {
    reset()
  }, [message, reset])

  console.log(`rawSignature`, rawSignature);
  console.log(`message`, message);
  console.log(`isConnected`, isConnected);

  const canSign = message !== '' && rawSignature === undefined && isConnected
  const canSubmit = isSuccess && anonSet !== null && proofRequest !== null


  const generateMerkleProof = async (): Promise<MerkleProof> => {
    const poseidon = new Poseidon();
    await poseidon.initWasm();

    const treeDepth = 20;
    const tree = new Tree(treeDepth, poseidon);

    if (!anonSet) throw new Error("AnonSet is empty");

    const proverPubKey = Buffer.from(anonSet[0]);
    const proverPubkeyHash = poseidon.hashPubKey(proverPubKey);

    tree.insert(proverPubkeyHash);

    // Insert other members into the tree, skipping addresses[0]
    for (let i = 1; i < anonSet.length; i++) {
      const member = anonSet[i];
      tree.insert(
        poseidon.hashPubKey(Buffer.from(member))
      );
    }

    const index = tree.indexOf(proverPubkeyHash);
    const merkleProof = tree.createProof(index);

    return merkleProof
  }

  useEffect(() => {
    (async () => {
      if (message === '' || rawSignature === undefined || anonSet === null) return

      const merkleProof = await generateMerkleProof();

      setProofRequest(
        new ProofRequest({
          addresses: anonSet,
          merkleProof,
          message,
          rawSignature,
          url: config.urls.proveApi,
        }),
      )
    })()
  }, [canSign, canSubmit, message, rawSignature, anonSet])

  return {
    canSign,
    canSubmit,
    isError,
    isLoading,
    isSuccess,
    message,
    rawSignature,
    setMessage,
    signMessage,
  }
}
