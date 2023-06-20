// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "forge-std/Test.sol";
import {AnonMinter} from "../src/AnonMinter.sol";

contract VerifierTest is Test {
    AnonMinter public anonMinter;
    address public receiver = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;

    function setUp() public {
        anonMinter = new AnonMinter(0x2c3c5ea21599db4ed6e474fbb4c440c8b8062947748ddb3f4bea808282742aa4);
    }

    function test_init() public {
        assertEq(anonMinter.merkleRoot(), 0x2c3c5ea21599db4ed6e474fbb4c440c8b8062947748ddb3f4bea808282742aa4);
        assertEq(anonMinter.name(), "AnonMinter");
        assertEq(anonMinter.symbol(), "ANON");
    }

    function test_verifyProof_true() public {
        assertTrue(
            anonMinter.verifyProof(
                [
                    0x2b253ebc570e52c1331f20427c685f686f16930f80f95a724ff7568a4d1bbc18,
                    0x19747f0f5877e5f5a102ab7904d8c3f1753703e2a1420d15dc28584d03e94544
                ],
                [
                    [
                        0x24fc3f34a00cd063f6ddc23850e7fd23a1db245b56518f00f8f254708d5ebe59,
                        0x014cc5ffa34dab9f92a39c22494060d90107034a932178f86cf809fe63300e63
                    ],
                    [
                        0x2895fe7aa4c69fd058102b08e1bdefbe4cb24dc07de0620b0526e9e79d4ff2f4,
                        0x0b60af5e90d89db09f68b673082d33d85f2e6b1e8a1310bfcc2a702dc497dacd
                    ]
                ],
                [
                    0x1846a5a6cd50358d1e3281aedbe14e66cb85d7d33cc474cf53d6f495b2ea9767,
                    0x2da6dc55dd1f0a6eec4c785130f7bc38bb47b0119c2da033b3d9c7fdb30dbe15
                ],
                [
                    0x00000000000000000000000000000000000000000000000034a36193fad30e90,
                    0x000000000000000000000000000000000000000000000000f936d1517f3382fa,
                    0x0000000000000000000000000000000000000000000000003d6765793bc47d52,
                    0x000000000000000000000000000000000000000000000000bac342f279e25ce3,
                    0x2c3c5ea21599db4ed6e474fbb4c440c8b8062947748ddb3f4bea808282742aa4
                ]
            )
        );
    }

    function test_verifyProof_false() public {
        assertFalse(
            anonMinter.verifyProof(
                [
                    0x3b253ebc570e52c1331f20427c685f686f16930f80f95a724ff7568a4d1bbc18,
                    0x19747f0f5877e5f5a102ab7904d8c3f1753703e2a1420d15dc28584d03e94544
                ],
                [
                    [
                        0x24fc3f34a00cd063f6ddc23850e7fd23a1db245b56518f00f8f254708d5ebe59,
                        0x014cc5ffa34dab9f92a39c22494060d90107034a932178f86cf809fe63300e63
                    ],
                    [
                        0x2895fe7aa4c69fd058102b08e1bdefbe4cb24dc07de0620b0526e9e79d4ff2f4,
                        0x0b60af5e90d89db09f68b673082d33d85f2e6b1e8a1310bfcc2a702dc497dacd
                    ]
                ],
                [
                    0x1846a5a6cd50358d1e3281aedbe14e66cb85d7d33cc474cf53d6f495b2ea9767,
                    0x2da6dc55dd1f0a6eec4c785130f7bc38bb47b0119c2da033b3d9c7fdb30dbe15
                ],
                [
                    0x00000000000000000000000000000000000000000000000034a36193fad30e90,
                    0x000000000000000000000000000000000000000000000000f936d1517f3382fa,
                    0x0000000000000000000000000000000000000000000000003d6765793bc47d52,
                    0x000000000000000000000000000000000000000000000000bac342f279e25ce3,
                    0x2c3c5ea21599db4ed6e474fbb4c440c8b8062947748ddb3f4bea808282742aa4
                ]
            )
        );
    }

    function test_failIf_InvalidMerkleRoot() public {
        vm.expectRevert("Merkle root does not match");
        anonMinter.mint(
            receiver,
            123,
            [
                0x2b253ebc570e52c1331f20427c685f686f16930f80f95a724ff7568a4d1bbc18,
                0x19747f0f5877e5f5a102ab7904d8c3f1753703e2a1420d15dc28584d03e94544
            ],
            [
                [
                    0x24fc3f34a00cd063f6ddc23850e7fd23a1db245b56518f00f8f254708d5ebe59,
                    0x014cc5ffa34dab9f92a39c22494060d90107034a932178f86cf809fe63300e63
                ],
                [
                    0x2895fe7aa4c69fd058102b08e1bdefbe4cb24dc07de0620b0526e9e79d4ff2f4,
                    0x0b60af5e90d89db09f68b673082d33d85f2e6b1e8a1310bfcc2a702dc497dacd
                ]
            ],
            [
                0x1846a5a6cd50358d1e3281aedbe14e66cb85d7d33cc474cf53d6f495b2ea9767,
                0x2da6dc55dd1f0a6eec4c785130f7bc38bb47b0119c2da033b3d9c7fdb30dbe15
            ],
            [
                0x00000000000000000000000000000000000000000000000034a36193fad30e90,
                0x000000000000000000000000000000000000000000000000f936d1517f3382fa,
                0x0000000000000000000000000000000000000000000000003d6765793bc47d52,
                0x000000000000000000000000000000000000000000000000bac342f279e25ce3,
                0x2d3c5ea21599db4ed6e474fbb4c440c8b8062947748ddb3f4bea808282742aa4 // only change this input compared to valid
            ]
        );
    }

    function test_FailIf_InvalidProof() public {
        vm.expectRevert("Invalid proof");
        anonMinter.mint(
            receiver,
            123,
            [
                0x3b253ebc570e52c1331f20427c685f686f16930f80f95a724ff7568a4d1bbc18,
                0x19747f0f5877e5f5a102ab7904d8c3f1753703e2a1420d15dc28584d03e94544
            ],
            [
                [
                    0x24fc3f34a00cd063f6ddc23850e7fd23a1db245b56518f00f8f254708d5ebe59,
                    0x014cc5ffa34dab9f92a39c22494060d90107034a932178f86cf809fe63300e63
                ],
                [
                    0x2895fe7aa4c69fd058102b08e1bdefbe4cb24dc07de0620b0526e9e79d4ff2f4,
                    0x0b60af5e90d89db09f68b673082d33d85f2e6b1e8a1310bfcc2a702dc497dacd
                ]
            ],
            [
                0x1846a5a6cd50358d1e3281aedbe14e66cb85d7d33cc474cf53d6f495b2ea9767,
                0x2da6dc55dd1f0a6eec4c785130f7bc38bb47b0119c2da033b3d9c7fdb30dbe15
            ],
            [
                0x00000000000000000000000000000000000000000000000034a36193fad30e90,
                0x000000000000000000000000000000000000000000000000f936d1517f3382fa,
                0x0000000000000000000000000000000000000000000000003d6765793bc47d52,
                0x000000000000000000000000000000000000000000000000bac342f279e25ce3,
                0x2c3c5ea21599db4ed6e474fbb4c440c8b8062947748ddb3f4bea808282742aa4
            ]
        );
    }

    function test_mint() public {
        anonMinter.mint(
            receiver,
            123,
            [
                0x2b253ebc570e52c1331f20427c685f686f16930f80f95a724ff7568a4d1bbc18,
                0x19747f0f5877e5f5a102ab7904d8c3f1753703e2a1420d15dc28584d03e94544
            ],
            [
                [
                    0x24fc3f34a00cd063f6ddc23850e7fd23a1db245b56518f00f8f254708d5ebe59,
                    0x014cc5ffa34dab9f92a39c22494060d90107034a932178f86cf809fe63300e63
                ],
                [
                    0x2895fe7aa4c69fd058102b08e1bdefbe4cb24dc07de0620b0526e9e79d4ff2f4,
                    0x0b60af5e90d89db09f68b673082d33d85f2e6b1e8a1310bfcc2a702dc497dacd
                ]
            ],
            [
                0x1846a5a6cd50358d1e3281aedbe14e66cb85d7d33cc474cf53d6f495b2ea9767,
                0x2da6dc55dd1f0a6eec4c785130f7bc38bb47b0119c2da033b3d9c7fdb30dbe15
            ],
            [
                0x00000000000000000000000000000000000000000000000034a36193fad30e90,
                0x000000000000000000000000000000000000000000000000f936d1517f3382fa,
                0x0000000000000000000000000000000000000000000000003d6765793bc47d52,
                0x000000000000000000000000000000000000000000000000bac342f279e25ce3,
                0x2c3c5ea21599db4ed6e474fbb4c440c8b8062947748ddb3f4bea808282742aa4
            ]
        );

        assertEq(anonMinter.balanceOf(receiver), 1);
        assertEq(anonMinter.ownerOf(uint256(123)), receiver);
    }
}
