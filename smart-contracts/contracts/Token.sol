// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        uint _totalSupply
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, _totalSupply * 1e18);
    }
}
