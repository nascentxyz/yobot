// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import {ERC165} from "zeppelin-solidity/utils/introspection/ERC165.sol";
import {ERC721} from "zeppelin-solidity/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "zeppelin-solidity/token/ERC721/extensions/ERC721Enumerable.sol";

/**
 * ERC721 base contract without the concept of tokenUri as this is managed by the parent
 */
contract CustomERC721Metadata is ERC165, ERC721, ERC721Enumerable {
    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;

    /**
     * @dev Constructor function
     */
    constructor(string memory con_name, string memory con_symbol) public {
        _name = con_name;
        _symbol = con_symbol;

        // register the supported interfaces to conform to ERC721 via ERC165
        // ?? Changed `_registerInterface` to `supportsInterface` ??
        supportsInterface(_INTERFACE_ID_ERC721_METADATA);
    }

    /**
     * @dev Gets the token name
     * @return string representing the token name
     */
    function name() external view returns (string memory) {
        return _name;
    }

    /**
     * @dev Gets the token symbol
     * @return string representing the token symbol
     */
    function symbol() external view returns (string memory) {
        return _symbol;
    }
}
