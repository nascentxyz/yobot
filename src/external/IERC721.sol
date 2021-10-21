// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

interface IERC721 {
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable;
}
