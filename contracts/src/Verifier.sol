pragma solidity >=0.7.0 <0.9.0;

// trigger ci

import "openzeppelin/token/ERC721/ERC721.sol";
import "./Groth16Verifier.sol";

contract Verifier is Groth16Verifier {
    uint256 public merkleRoot;

    constructor(uint256 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    modifier validMerkleRoot(uint256[5] calldata _pubSignals) {
        require(_pubSignals[4] == merkleRoot, "Merkle root does not match");
        _;
    }

    function verify(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[5] calldata _pubSignals
    ) external view validMerkleRoot(_pubSignals) returns (bool) {
        return this._verifyProof(_pA, _pB, _pC, _pubSignals);
    }
}
