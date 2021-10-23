// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

/// @title AccessControlled
/// @author Andreas Bigger, Artbotter 
/// @notice An access controller for Yobot Contracts
contract AccessControlled {
    address private admin;
    mapping (address => bool) private operators;
    
    event OperatorToggled(address indexed operator, bool active);
    event AdminTransferred(address oldAdmin, address newAdmin);
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, 'not admin');
        _;
    }
    
    modifier onlyOperator() {
        require(isOperator(msg.sender), 'not operator');
        _;
    }
    
    function toggleOperators(address[] calldata _operators) external onlyAdmin {
        for (uint256 i; i < _operators.length; i++) {
            bool newStatus = !operators[_operators[i]];
            operators[_operators[i]] = newStatus;
            emit OperatorToggled(_operators[i], newStatus);
        }
    }
    
    function transferAdmin(address _newAdmin) external onlyAdmin {
        address oldAdmin = admin;
        admin = _newAdmin;
        emit AdminTransferred(oldAdmin, _newAdmin);
    }
    
    function getAdmin() external view returns (address) {
        return admin;
    }
    
    function isOperator(address _addr) public view returns (bool) {
        return operators[_addr];
    }
}