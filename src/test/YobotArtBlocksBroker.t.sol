// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import { DSTestPlus } from "./utils/DSTestPlus.sol";

import { YobotArtBlocksBroker } from "../YobotArtBlocksBroker.sol";


contract YobotArtBlocksBrokerTest is DSTestPlus {
    YobotArtBlocksBroker yabb;

    /// @dev internal contract state
    address public coordinator;
	address public profitReceiver;
	uint256 public artBlocksBrokerFeeBips;

    function setUp(address _coordinator, address _profitReceiver, uint256 _artBlocksBrokerFeeBips) public {
        coordinator = _coordinator;
        profitReceiver = _profitReceiver;
        artBlocksBrokerFeeBips = _artBlocksBrokerFeeBips;
        yabb = new YobotArtBlocksBroker(profitReceiver, artBlocksBrokerFeeBips);
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
