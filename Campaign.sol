pragma solidity >=0.7.0 <0.9.0;

contract Campaign {
    struct Request {
            string description;
            uint value;
            address recipient;
            bool complete;
            uint approvalCount;
            mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;

    modifier restricted() {
            require(msg.sender == manager);
            _;
    }
    
    constructor(uint minimum) public {
            manager = msg.sender;
            minimumContribution = minimum;
    }
    
    function contribute() public payable {
            require(msg.value > minimumContribution);
            
            approvers[msg.sender] = true;
    }
    
    function createRequest(string memory description, uint value, address recipient) public restricted {            
            Request storage newRequest = requests.push();
        
            newRequest.description = description;
            newRequest.value = value;
            newRequest.recipient = recipient;
            newRequest.complete = false;
            newRequest.approvalCount = 0;
    }
    
    function approveRequest(uint index) public {
            Request storage request = requests[index];

            require(approvers[msg.sender]);
            require(!request.approvals[msg.sender]);
            
            request.approvals[msg.sender] = true;
            request.approvalCount++;
    }
}

