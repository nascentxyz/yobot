// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { ERC721 } from "zeppelin-solidity/token/ERC721/ERC721.sol";

/// @title MockERC721
/// @author Andreas Bigger <andreas@nascent.xyz>
/// @notice A Mock ERC721 Token
contract MockERC721 is ERC721 {
    /// @dev the token ids
    uint256 private _tokenIds;

    /// @notice the maximum number of tokens
    uint256 public constant MAXIMUM_TOKENS = 10000;

    /// @dev developooor
    address private developer;

    /// @notice constructs the ERC721
    constructor(address _developer)
        ERC721(
            "MockERC721", // name
            "MOCK" // symbol
        )
    {
        developer = _developer;
    }

    /*///////////////////////////////////////////////////////////////
                      MINT FUNCTION
    //////////////////////////////////////////////////////////////*/

    function mint() external payable {
        /// CHECKS
        uint256 newToken = _tokenIds;
        require(newToken < MAXIMUM_TOKENS, "OUT_OF_SUPPLY");
        require(msg.value >= 0.001 ether, "PRICE_NOT_MET");

        /// EFFECTS
        // Increment the tokenId for the next person that uses it.
        _tokenIds += 1;

        /// INTERACTIONS
        // The magical function! Assigns the tokenId to the caller's wallet address.
        _safeMint(msg.sender, newToken);

        // Try to send value to the developooor
        payable(developer).call{value: msg.value}("");
    }
}
