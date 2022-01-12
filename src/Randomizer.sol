// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/* solhint-disable var-name-mixedcase */

import {SafeMath} from "zeppelin-solidity/utils/math/SafeMath.sol";

/// @title Randomizer
contract Randomizer {
    /// @dev use boomer maths
    using SafeMath for uint256;

    /// @dev internal SEEDOOOOR
    uint256 private immutable SEEDOOOOR;

    /// @dev the constructoooor
    /// @param _seed the seed value for the hash
    constructor(uint256 _seed) {
        SEEDOOOOR = _seed;
    }

    /// @notice returns a pseudo-random value using encodePacked
    /// @return pseudo-random bytes32
    function returnValue() external view returns (bytes32) {
        return keccak256(abi.encodePacked(block.difficulty, block.timestamp, SEEDOOOOR));
    }
}
