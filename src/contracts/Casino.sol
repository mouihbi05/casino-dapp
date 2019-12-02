pragma solidity ^0.5.0;

contract Casino {

    address public owner;
    uint public minBetPrice = 1;
    uint public maxBets = 2;
    uint public noOfBets;
    uint public totalBetAmount;
    uint public winnerNumber;

    address payable[] public winners;
    uint public winnerCount;
    uint public winnerAmount;
    address payable[] public existingPlayers;

    

    struct players{
        uint betNo;
        uint amount;
    }

    mapping(address => players) public playerInfo;

    constructor() public {
       owner = msg.sender;
    }

    function checkIfPlayerExists(address _player) public view returns (bool) {
        for(uint i = 0; i < existingPlayers.length; i++) {
            if(existingPlayers[i] == _player) {
                return true;
            }
        }
        return false;
    }
    function bet(uint _num)  public payable  {

        require(_num >=1 && _num <=10);
        require(msg.value >= minBetPrice);
        require(!checkIfPlayerExists(msg.sender));
        playerInfo[msg.sender] = players(_num, msg.value);
        noOfBets ++;
        totalBetAmount += msg.value;
        existingPlayers.push(msg.sender); 
        
    }

    function generateWinner() public {
        // require(noOfBets == maxBets);
        winnerNumber= block.number % 10 + 1;
        distributePrizes(winnerNumber);
    }

    function distributePrizes(uint _num) public payable {
         for(uint i = 0; i < existingPlayers.length; i++) {
             if(playerInfo[existingPlayers[i]].betNo == _num) {
                 winnerCount ++;
                 winners.push(existingPlayers[i]);
             }
             delete playerInfo[existingPlayers[i]];
         }
         existingPlayers.length = 0;
         winnerAmount = totalBetAmount / winnerCount;
         for (uint i = 0; i < winners.length; i++) {
             
             winners[i].transfer(winnerAmount);
         }
    }

}