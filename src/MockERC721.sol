// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// NFT contract to inherit from.
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import  "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title MockERC721
/// @author Andreas Bigger <andreas@nascent.xyz>
/// @notice A Mock ERC721 Token
contract MockERC721 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /// @dev developooor
    address private developer;

    /// @notice constructs the ERC721
    constructor(address _developer)
      ERC721(
        "MockERC721", // name
        "MOCK" // symbol
    ) {
      developer = _developer;
    }

    /*///////////////////////////////////////////////////////////////
                      MINT FUNCTION
    //////////////////////////////////////////////////////////////*/

    function mint() external payable {
      /// CHECKS
      require(msg.value >= 0.02, "PRICE_NOT_MET");

      /// EFFECTS
      // Get current tokenId (starts at 1 since we incremented in the constructor).
      uint256 newItemId = _tokenIds.current();
      
      // The magical function! Assigns the tokenId to the caller's wallet address.
      _safeMint(msg.sender, newItemId);
      
      // Try to send value to the developooor
      payable(developer).call{value: msg.value}("");

      /// INTERACTIONS
      // Increment the tokenId for the next person that uses it.
      _tokenIds.increment();
    }
}