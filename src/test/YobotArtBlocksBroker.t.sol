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

    function setUp(address _profitReceiver, uint256 _artBlocksBrokerFeeBips) public {
        profitReceiver = _profitReceiver;
        artBlocksBrokerFeeBips = _artBlocksBrokerFeeBips;
        yabb = new YobotArtBlocksBroker(profitReceiver, artBlocksBrokerFeeBips);

        // Sanity check on the coordinator
        assert(yabb.coordinator() == address(this));
        coordinator = yabb.coordinator();
    }

    /*///////////////////////////////////////////////////////////////
                        COORDINATOR
    //////////////////////////////////////////////////////////////*/

    /// @dev property base the changeCoordinator function
    /// @param newCoordinator the new coordinator set with changeCoordinator
    function testChangeCoordinator(address newCoordinator) public {
        // we need to use a fresh yabb since this test is run multiple times, causing coordinator caching
        YobotArtBlocksBroker tempyabb = new YobotArtBlocksBroker(profitReceiver, artBlocksBrokerFeeBips);
        tempyabb.changeCoordinator(newCoordinator);
        assert(tempyabb.coordinator() == newCoordinator);
    }

    /// @dev Ensures the onlyCoordinator modifier is working for changeCoordinator
    /// @param honestCoordinator the honest coordinator of a YobotArtBlocksBroker contract
    /// @param newCoordinator a new coordinator attempted to be set by address(this)
    function testFailChangeCoordinator(address honestCoordinator, address newCoordinator) public {
        // if this is the honestCoordinator, changing the coordinator to the `newCoordinator` won't fail
        assert(address(this) != honestCoordinator);

        // create a new yabb with the honest coordinator
        YobotArtBlocksBroker tempyabb = new YobotArtBlocksBroker(profitReceiver, artBlocksBrokerFeeBips);
        tempyabb.changeCoordinator(honestCoordinator);
        assert(tempyabb.coordinator() == honestCoordinator);

        // this should fail since the onlyCoordinator modifier exists
        tempyabb.changeCoordinator(newCoordinator);
    }

    /*///////////////////////////////////////////////////////////////
                        PROFIT RECEIVER
    //////////////////////////////////////////////////////////////*/

    /// @dev property base the changeProfitReceiver function
    function testChangeProfitReceiver(address newProfitReceiver) public {
        // we need to use a fresh yabb since this test is run multiple times, causing coordinator caching
        YobotArtBlocksBroker tempyabb = new YobotArtBlocksBroker(profitReceiver, artBlocksBrokerFeeBips);
        tempyabb.changeProfitReceiver(newProfitReceiver);
        assert(tempyabb.profitReceiver() == newProfitReceiver);
    }

    /// @dev Ensures the onlyCoordinator modifier is working for changeProfitReceiver
    /// @param honestCoordinator the honest coordinator of a YobotArtBlocksBroker contract
    /// @param newProfitReceiver a new profit receiver attempted to be set by address(this)
    function testFailChangeProfitReceiver(address honestCoordinator, address newProfitReceiver) public {
        // if this is the honestCoordinator, changing the coordinator to the `newProfitReceiver` won't fail
        assert(address(this) != honestCoordinator);

        // create a new yabb with the honest coordinator
        YobotArtBlocksBroker tempyabb = new YobotArtBlocksBroker(profitReceiver, artBlocksBrokerFeeBips);
        tempyabb.changeCoordinator(honestCoordinator);
        assert(tempyabb.coordinator() == honestCoordinator);

        // this should fail since the onlyCoordinator modifier exists
        tempyabb.changeProfitReceiver(newProfitReceiver);
    }

    /*///////////////////////////////////////////////////////////////
                        ART BLOCKS BROKER FEE BIPS
    //////////////////////////////////////////////////////////////*/

    /// @notice the new fee must always be less than the old fee
    /// @dev property base the changeArtBlocksBrokerFeeBips function
    /// @param oldFee the old artBlocksBrokerFeeBips specified in the constructor
    /// @param newFee the new artBlocksBrokerFeeBips set with changeArtBlocksBrokerFeeBips
    function testChangeArtBlocksBrokerFeeBips(uint256 oldFee, uint256 newFee) public {
        if (newFee < oldFee && oldFee < 10_000) {
            YobotArtBlocksBroker tempyabb = new YobotArtBlocksBroker(address(0), oldFee);
            tempyabb.changeArtBlocksBrokerFeeBips(newFee);
            assert(tempyabb.artBlocksBrokerFeeBips() == newFee);
        } else if (newFee > oldFee && newFee < 10_000) {
            // in this case, newFee acts as the old fee and vise versa...
            YobotArtBlocksBroker tempyabb = new YobotArtBlocksBroker(address(0), newFee);
            tempyabb.changeArtBlocksBrokerFeeBips(oldFee);
            assert(tempyabb.artBlocksBrokerFeeBips() == oldFee);
        } else {
            // Either the fees are equal, or one of the fees is greater than 10,000
            assert(oldFee == newFee || (oldFee > 10_000 || newFee > 10_000));
        }
    }

    /// @dev Ensures the onlyCoordinator modifier is working for changeArtBlocksBrokerFeeBips
    /// @param honestCoordinator the honest coordinator of a YobotArtBlocksBroker contract
    /// @param newFee the new artBlocksBrokerFeeBips attempted
    ///               to be set with changeArtBlocksBrokerFeeBips and address(this)
    function testFailChangeArtBlocksBrokerFeeBips(address honestCoordinator, uint256 newFee) public {
        // if this is the honestCoordinator, changing the coordinator to the `newFee` won't fail
        assert(address(this) != honestCoordinator);

        // the new artBlocksBrokerFeeBips must be less than the previous fee
        assert(newFee < artBlocksBrokerFeeBips);

        // create a new yabb with the honest coordinator
        YobotArtBlocksBroker tempyabb = new YobotArtBlocksBroker(profitReceiver, artBlocksBrokerFeeBips);
        tempyabb.changeCoordinator(honestCoordinator);
        assert(tempyabb.coordinator() == honestCoordinator);

        // this should fail since the onlyCoordinator modifier exists
        tempyabb.changeArtBlocksBrokerFeeBips(newFee);
    }
}
