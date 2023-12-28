// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    uint256 public _count;

    event Increased(uint256 updatedCount);
    event Decreased(uint256 updatedCount);

    constructor() {}

    function increase() public {
        _count++;
        emit Increased(_count);
    }

    function decrease() public {
        require(_count > 0, "counter already zero");
        _count--;
        emit Decreased(_count);
    }
}
