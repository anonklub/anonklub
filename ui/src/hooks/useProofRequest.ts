import { MerkleTree, ProofRequest } from '@anonklub/proof'
import {
  MembershipProver, MerkleProof, Poseidon, Tree, defaultPubkeyMembershipPConfig
} from "@personaelabs/spartan-ecdsa";
import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { config } from '#'
import { useStore } from './useStore'

export const useProofRequest = () => {
  const { isConnected, address } = useAccount()
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

  // console.log(`address`, address?.toLocaleLowerCase);
  // console.log(`rawSignature`, rawSignature);
  // console.log(`message`, message);
  // console.log(`isConnected`, isConnected);

  const canSign = message !== '' && rawSignature === undefined && isConnected
  const canSubmit = isSuccess && anonSet !== null && proofRequest !== null

  function serializeWithBigInt(obj) {
    return JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );
  }

  const generateMerkleProof = async (): Promise<MerkleProof> => {
    const poseidon = new Poseidon();
    await poseidon.initWasm();

    const treeDepth = 20;
    const tree = new Tree(treeDepth, poseidon);

    if (!anonSet) throw new Error("AnonSet is empty");

    if (!address) throw new Error("Address is not set");

    const proverAddress = BigInt(address.toLowerCase());
    console.log("==> AnonSet members total number is ", anonSet.length);
    console.log("==> Prover Address", address.toLowerCase());

    const serializedProof = localStorage.getItem("merkleProof");

    if (serializedProof) {
      console.log("==> Merkle Proof data is found in the local storage!");
      const merkleProof = JSON.parse(serializedProof);
      return merkleProof;
    } else {
      console.log("==> Merkle Proof data is not found in the local storage!");
      tree.insert(proverAddress);

      // Insert other members into the tree, skipping addresses[0]
      for (let i = 1; i < anonSet.length; i++) {
        // if (i === 32767) break;
        const member = anonSet[i];

        const wrongAddressConversion = "0x" + Buffer.from("".padStart(16, member), "utf16le").toString("hex");

        tree.insert(BigInt(member));

        console.log(`==> Tree member ${i}/${anonSet.length} ${member} is inserted`);
      }

      const index = tree.indexOf(proverAddress);
      const merkleProof = tree.createProof(index);

      // Serialize and store the tree and proof
      try {
        const serializedProof = serializeWithBigInt(merkleProof); // Adjust if necessary
        localStorage.setItem('merkleProof', serializedProof);
      } catch (error) {
        console.error('Error serializing with bigint the Merkle tree or proof:', error);
      }

      return merkleProof
    }
  }

  useEffect(() => {
    (async () => {
      if (message === '' || rawSignature === undefined || anonSet === null) return

      const merkleProof = await generateMerkleProof();

      console.log("==> Merkle Proof for the AnonSet tree is", merkleProof);

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
