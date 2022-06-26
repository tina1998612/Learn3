//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Course.sol";

contract CourseFactory is Ownable {
    Course[] public courses;

    function createCourse(
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
    ) external returns (address) {
        Course c = new Course(_name, _symbol, _price, _baseTokenURI, _isCrowdfund, _crowdfundPeriod, _crowdfundGoalStudentCount, _refundPeriod, _tutors, _tutorsPercent, _QnABoardShare);
        courses.push(c);
        return address(c);
    }

    function getCourseCount () external view returns (uint) {
        return courses.length;
    }

    function withdraw() external onlyOwner {
        Address.sendValue(payable(owner()), address(this).balance);
    }
}