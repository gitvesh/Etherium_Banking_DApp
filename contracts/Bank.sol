// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint256) public balances;
    
    event Deposit(address indexed sender, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // Deposit ETH to the contract
    function deposit() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Send ETH to another user
    function sendMoney(address payable _to, uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        require(_to != address(0), "Invalid address");

        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        _to.transfer(_amount);

        emit Transfer(msg.sender, _to, _amount);
    }

    // Check balance
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
