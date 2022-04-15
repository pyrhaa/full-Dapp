//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CTEtoken is ERC20 {
    constructor() ERC20("Cocotte Token", "CTE") {
        _mint(msg.sender, 1000000);
    }
}
