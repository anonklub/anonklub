pragma solidity >=0.7.0 <0.9.0;

import {Groth16Verifier} from "./Groth16Verifier.sol";

contract Verifier is Groth16Verifier {
    uint256 public merkleRoot;

    constructor(uint256 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    function _verifyProof(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[5] calldata _pubSignals
    ) internal view override returns (bool) {
        require(_pubSignals[4] == merkleRoot, "Merkle root does not match");
        return super._verifyProof(_pA, _pB, _pC, _pubSignals);
    }
}
