// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    //Token
    IERC20 public immutable STAKING_TOKEN;

    //Staked Details
    mapping(address => uint) public stakedBalanceOf;
    uint public stakedTotal;

    constructor(address _stakingToken) {
        STAKING_TOKEN = IERC20(_stakingToken);
    }

    //Events
    event Stake(address indexed _from, address indexed _to, uint _amount);
    event UnStake(address indexed _from, address indexed _to, uint _amount);

    //Stake
    function stake(uint _amount) external {
        stakedBalanceOf[msg.sender] += _amount;
        stakedTotal += _amount;

        bool success = STAKING_TOKEN.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(success, "Staking Failed");

        emit Stake(msg.sender, address(this), _amount);
    }

    //UnStake
    function unStake(uint _amount) external {
        require(
            stakedBalanceOf[msg.sender] >= _amount,
            "Insufficient Staked Balance"
        );

        stakedBalanceOf[msg.sender] -= _amount;
        stakedTotal -= _amount;

        bool success = STAKING_TOKEN.transfer(msg.sender, _amount);
        require(success, "UnStake Failed");

        emit UnStake(address(this), msg.sender, _amount);
    }
}
