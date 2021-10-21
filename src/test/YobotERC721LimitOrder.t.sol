// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import {DSTestPlus} from "./utils/DSTestPlus.sol";

import {YobotERC721LimitOrder} from "../YobotERC721LimitOrder.sol";

contract YobotERC721LimitOrderTest is DSTestPlus {
    YobotERC721LimitOrder public ylo;

    /// @dev internal contract state
    address public coordinator;
    address public profitReceiver;
    uint256 public artBlocksBrokerFeeBips;

    function setUp(address _profitReceiver, uint256 _artBlocksBrokerFeeBips) public {
        profitReceiver = _profitReceiver;
        artBlocksBrokerFeeBips = _artBlocksBrokerFeeBips;
        ylo = new YobotERC721LimitOrder(profitReceiver, artBlocksBrokerFeeBips);

        // Sanity check on the coordinator
        assert(ylo.coordinator() == address(this));
        coordinator = ylo.coordinator();
    }
}
