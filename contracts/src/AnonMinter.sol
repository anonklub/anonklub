pragma solidity >=0.7.0 <0.9.0;

import "openzeppelin/token/ERC721/ERC721.sol";
import "./Groth16Verifier.sol";

contract AnonMinter is ERC721, Groth16Verifier {
    uint256 public merkleRoot;

    constructor(uint256 _merkleRoot) ERC721("AnonMinter", "ANON") {
        merkleRoot = _merkleRoot;
    }

    modifier validMerkleRoot(uint256[5] calldata _pubSignals) {
        require(_pubSignals[4] == merkleRoot, "Merkle root does not match");
        _;
    }

    modifier validProof(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[5] calldata _pubSignals
    ) {
        require(this._verifyProof(_pA, _pB, _pC, _pubSignals), "Invalid proof");
        _;
    }

    function mint(
        address to,
        uint256 tokenId,
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[5] calldata _pubSignals
    ) public validMerkleRoot(_pubSignals) validProof(_pA, _pB, _pC, _pubSignals) {
        _safeMint(to, tokenId);
    }
}
