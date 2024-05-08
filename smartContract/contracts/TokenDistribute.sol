// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MyStructs.sol";
import "./interfaces/ITokenDistribute.sol";

contract TokenDistribute {
    address private tokenStorageAddress;
    
    function setStorageAddress(address _addr) public {
        require(_addr != address(0), unicode"올바르지 않은 주소값입니다.");
        tokenStorageAddress = _addr;
    }

    function distributeToken(Subscription memory subscription, address _wallet, uint amount) external {
        ITokenDistribute(tokenStorageAddress).transfer(subscription, _wallet, amount);
    }
}