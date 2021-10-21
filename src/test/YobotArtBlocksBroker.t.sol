// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import {DSTestPlus} from "./utils/DSTestPlus.sol";

import {YobotArtBlocksBroker} from "../YobotArtBlocksBroker.sol";

contract YobotArtBlocksBrokerTest is DSTestPlus {
    YobotArtBlocksBroker public yabb;

    /// @dev internal contract state
    address public coordinator;
    address public profitReceiver;
    uint256 public botFeeBips;

    function setUp(address _profitReceiver, uint256 _botFeeBips) public {
        profitReceiver = _profitReceiver;
        botFeeBips = _botFeeBips;
        yabb = new YobotArtBlocksBroker(profitReceiver, botFeeBips);

        // Sanity check on the coordinator
        assert(yabb.coordinator() == address(this));
        coordinator = yabb.coordinator();
    }
}
