// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {DSTestPlus as DSTest} from "solmate/test/utils/DSTestPlus.sol";
import {ERC20} from "solmate/erc20/ERC20.sol";

import {YobotArtBlocksBroker} from "../../YobotArtBlocksBroker.sol";

contract DSTestPlus is DSTest {
    function assertERC20Eq(ERC20 erc1, ERC20 erc2) internal {
        assertEq(address(erc1), address(erc2));
    }

    function assertBrokerEq(YobotArtBlocksBroker ya, YobotArtBlocksBroker yb) public {
        assertEq(address(ya), address(yb));
    }
}
