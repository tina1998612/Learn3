//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol"; 

contract QnABoard is Ownable {
    
    uint public nextQuestionID;
    address public courseContractAddr;
    address[] public correctAnswerers;

    struct Question {
        address initiator;
        uint reward;
        bytes32 content;
    }
    struct Answer {
        address initiator;
        bytes32 content;
    }

    mapping(uint256 => Answer[]) public pendingAns; // question ID to pending answers
    mapping(uint256 => Answer) public correctAnswers; // question ID to answer

    Question[] public questions;

    constructor(address _courseContract){
        courseContractAddr = _courseContract;
    }

    function postQuestion(uint _reward, bytes32 _hash) external payable {
        require(msg.value >= _reward, "Reward not given enough as specified.");
        questions[nextQuestionID] = Question(_msgSender(), _reward, _hash);
        nextQuestionID++;
    }

    // @param _hash: hash of the anser text
    function answerQuestion(uint _questionID, bytes32 _hash) external {
        require(_msgSender() != questions[_questionID].initiator, "Answerer cannot be the same as the question poster.");
        pendingAns[_questionID].push(Answer(_msgSender(), _hash));
    }

    function acceptAnswer(uint _questionID, uint _answerID) external {
        require(_msgSender() == questions[_questionID].initiator, "Answer can only be accepted as correct by the question initiator.");
        correctAnswers[_questionID] = pendingAns[_questionID][_answerID];
        Address.sendValue(payable(correctAnswers[_questionID].initiator), questions[_questionID].reward);
        correctAnswerers.push(correctAnswers[_questionID].initiator);
    }

    receive() external payable {
        // reward last 10 correct answerers
        uint fullAmount = address(this).balance;
        uint totalAnswerers = correctAnswerers.length;
        uint rewardCount = totalAnswerers > 10? 10: totalAnswerers;
        for(uint i= totalAnswerers - 1; i>= totalAnswerers - rewardCount; i--){
            Address.sendValue(payable(correctAnswerers[i]), fullAmount/rewardCount);
        }
    }
}