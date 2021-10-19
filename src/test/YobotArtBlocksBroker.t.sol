// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import { DSTestPlus } from "./utils/DSTestPlus.sol";

import { YobotArtBlocksBroker } from "../YobotArtBlocksBroker.sol";

contract YobotArtBlocksBrokerTest is DSTest {
    YobotArtBlocksBroker yabb;

    function setUp() public {
        yabb = new YobotArtBlocksBroker();
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
