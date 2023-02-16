import { Point } from '@noble/secp256k1'

export class ProofRequest {
    addresses: bigint[];
    signature: Uint8Array;
    msghash: Uint8Array;
    address_index: number;
    pubkey: Point; 

    constructor(addresses: bigint[], signature: Uint8Array, msghash: Uint8Array, address_index: number, pubkey: Point) {
        this.addresses = addresses;
        this.signature = signature;
        this.msghash = msghash;
        this.address_index = address_index;
        this.pubkey = pubkey;
    }
    
    stringify() {
        return JSON.stringify(this, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        );
    }
}


interface ProofResponse {

}