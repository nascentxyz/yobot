// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import {DSTestPlus} from "./utils/DSTestPlus.sol";

import {YobotArtBlocksBroker} from "../YobotArtBlocksBroker.sol";

contract YobotArtBlocksBrokerTest is DSTestPlus {
    YobotArtBlocksBroker public yabb;

    /// @dev internal contract state
    address public coordinator;
    address public profitReceiver;
    uint256 public artBlocksBrokerFeeBips;

    function setUp(
        address _coordinator,
        address _profitReceiver,
        uint256 _artBlocksBrokerFeeBips
    ) public {
        coordinator = _coordinator;
        profitReceiver = _profitReceiver;
        artBlocksBrokerFeeBips = _artBlocksBrokerFeeBips;
        yabb = new YobotArtBlocksBroker(profitReceiver, artBlocksBrokerFeeBips);
    }

    function testFailBasicSanity() public {
        assertTrue(false);
    }

    function testBasicSanity() public {
        assertTrue(true);
    }
}
