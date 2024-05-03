// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TokenStorage is ERC20, Ownable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE"); // 토큰 생성 role
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE"); // 토큰 발급 role
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE"); // 토큰 burn role

    mapping(uint => bool) public isExists; // 청약 코드에 맞는 token이 현재 발급되었는지 유무 확인
    mapping(uint => uint) public tokenSupplies; // 청약 코드에 맞는 token이 현재 몇개 소유중인지 확인.
    mapping(address => mapping(uint => uint)) ownToken;

    constructor (address _minter, address _distributor) ERC20("RoastingToken", "ROTTO") {
        _grantRole(MINTER_ROLE, _minter); // TokenCreation contract에 토큰 생성 역할 부여
        _grantRole(DISTRIBUTOR_ROLE, _distributor);
    }

    function decimals() public pure override returns(uint8) {
        return 0;
    }

    event testEvent(string message);
    event testAddress(address addr);
    
    // 토큰 생성
    function mint(uint code, uint amount) external {
        emit testEvent("TokenStorage.mint");
        emit testAddress(msg.sender);
        require(hasRole(MINTER_ROLE, msg.sender) || msg.sender == owner(), unicode"요청 권한이 없습니다.");
        require(isExists[code] != true, unicode"이미 생성된 토큰입니다.");

        isExists[code] = true;
        tokenSupplies[code] = amount;
        _mint(owner(), amount);
    }

    // 청약 코드에 맞는 token의 남은 개수 조회
    function leftover(uint code) public view returns(uint) {
        require(isExists[code], "Token is not created");
        return tokenSupplies[code];
    }
    
    // 사용자 지갑 주소를 이용하여 청약 코드와 일치하는 토큰 발급
    function transfer(uint code, address _wallet, uint amount) external {
        require(hasRole(DISTRIBUTOR_ROLE, msg.sender) || msg.sender == owner(), unicode"요청 권한이 없습니다.");
        require(isExists[code], unicode"해당 코드와 일치하는 토큰이 없습니다.");

        uint TokenBalance = leftover(code);
        require(TokenBalance >= amount && TokenBalance > 0, unicode"잘못된 요청입니다.");

        _transfer(owner(), _wallet, amount);
        tokenSupplies[code] -= amount;
        ownToken[_wallet][code] = amount;
    }

    // 기존 ERC20의 transfer 함수를 override 하여 사용자들 간의 거래를 막음
    function transfer(address _wallet, uint256 amount) public override returns(bool) {
        revert(unicode"잘못된 접근입니다.");
    }

    // 기존 ERC20의 transferFrom 함수를 override 하여 사용자들 간의 거래를 막음
    function transferFrom(address from, address to, uint amount) public override returns(bool) {
        revert(unicode"잘못된 접근입니다.");
    }
}