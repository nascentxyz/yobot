// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import {ERC165} from "lib/zeppelin-solidity/contracts/utils/introspection/ERC165";
import {ERC721} from "lib/zeppelin-solidity/contracts/token/ERC721/ERC721";
import {ERC721Enumerable} from "lib/zeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable";

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
    constructor(string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;

        // register the supported interfaces to conform to ERC721 via ERC165
        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
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
