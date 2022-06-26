//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol"; 
import "./QnABoard.sol";

contract Course is ERC721A, Ownable {

    string public baseTokenURI;
    uint public price;
    uint public crowdfundPeriod;
    uint public crowdfundEndTime;
    bool public isCrowdfund;
    uint public refundPeriod;
    uint public refundEndTime;
    uint public crowdfundGoalStudentCount;
    bool public active;
    bool public crowdfundStarted;
    address[] public tutors;
    uint[] public tutorsPercent;
    QnABoard public qaBoard;

    mapping(uint256 => bool) public hasRefunded;
    mapping(uint256 => uint256) public mintPrice; // tokenID to mint price for refund
    
    // revenue share
    uint public tutorShare;
    uint public QnABoardShare;
    uint public constant platformFeeShare = 10;
    address public constant platformFeeReceiver = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // TODO

    constructor (
        string memory _name, 
        string memory _symbol,
        uint _price,
        string memory _baseTokenURI,
        bool _isCrowdfund,
        uint _crowdfundPeriod,
        uint _crowdfundGoalStudentCount,
        uint _refundPeriod,
        address[] memory _tutors,
        uint[] memory _tutorsPercent,
        uint _QnABoardShare
    ) ERC721A(_name, _symbol) {
        require(_tutors.length == _tutorsPercent.length);
        price = _price;
        baseTokenURI = _baseTokenURI;
        isCrowdfund = _isCrowdfund;
        active = !_isCrowdfund;
        refundPeriod = _refundPeriod;
        crowdfundPeriod = _crowdfundPeriod;
        crowdfundGoalStudentCount = _crowdfundGoalStudentCount;
        tutors = _tutors;
        tutorsPercent = _tutorsPercent;
        if(!isCrowdfund){
            refundEndTime = block.timestamp + _refundPeriod;
        }
        QnABoardShare = _QnABoardShare;
        tutorShare = 90 - _QnABoardShare;
        qaBoard = new QnABoard(address(this));
    }

    modifier isActive() {
        require(active, "Course is not active.");
        _;
    }

    modifier isNotActive() {
        require(!active, "Course is active.");
        _;
    }

    modifier isRefundActive() {
        require(block.timestamp <= refundEndTime || refundEndTime == 0, "Refund period is over.");
        _;
    }

    function crowdFundStart() external onlyOwner isNotActive {
        require(isCrowdfund, "This course is not crowdfunding.");
        require(!crowdfundStarted, "The crowdfund has already started.");
        crowdfundEndTime = block.timestamp + crowdfundPeriod;
        crowdfundStarted = true;
    }

    function crowdfundEnd() external isNotActive {
        require(isCrowdfund, "This course is not crowdfunding.");
        require(block.timestamp >= crowdfundEndTime, "Crowdfund period not over");
        if(totalSupply() >= crowdfundGoalStudentCount){
            active = true;
            refundEndTime = block.timestamp + refundPeriod;
        }
        else {
            // crowdfund fails, refund never ends
            refundEndTime = 0;
        }
    }
    
    function enroll() external payable {
        // check fund
        require(msg.value >= price, "Not enough fund to mint NFT");
        mintPrice[_nextTokenId()] = price;
        super._safeMint(_msgSender(), 1);
    }

    function ownerReserve(address _recipient) external {
        mintPrice[_nextTokenId()] = 0;
        _safeMint(_recipient, 1);
    }

    function refund(uint tokenId) external isRefundActive {
        require(msg.sender == ownerOf(tokenId), "Not token owner");
        require(!hasRefunded[tokenId], "Already refunded");
        uint256 refundAmount = mintPrice[tokenId];
        require(refundAmount != 0, "Refund amount cannot be 0");
        hasRefunded[tokenId] = true;
        _burn(tokenId);

        Address.sendValue(payable(msg.sender), refundAmount);
    }

    function distributeRevenue() external {
        require(block.timestamp > refundEndTime && refundEndTime !=0, "Refund period not over");
        uint256 fullAmount = address(this).balance;
        
        // tutor's revenue share
        for(uint i=0; i<tutorsPercent.length; i++){
            Address.sendValue(payable(tutors[i]), fullAmount * tutorShare / 100 * tutorsPercent[i]);
        }

        // QnA board
        Address.sendValue(payable(address(qaBoard)), fullAmount * QnABoardShare / 100);

        // Platform fee 
        Address.sendValue(payable(platformFeeReceiver), address(this).balance);
    }

    /// @dev Set new baseURI
    function setBaseURI(string memory baseURI) external onlyOwner {
        baseTokenURI = baseURI;
    }

    /// @dev override _baseURI()
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}