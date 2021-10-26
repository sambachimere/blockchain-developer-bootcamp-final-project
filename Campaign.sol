pragma solidity ^0.4.17;

contract CampaignFactory {
    function createCampaign() public {
        // Create a new campaign
    }

    function getDeployedCampaigns() public view {
        // Get all deployeds campaigns
    }
}

contract Campaign {
    modifier restricted() {
        // Restrict some function calls to the creator of the campaign
    }

    function Campaign() public {
        // Set a new campaign
    }

    function contribute() public payable {
        // Allow user to contribute to a campaign
    }

    function createRequest() public restricted {
        // Creator of the campaign can create a request to use the collected money
        // This request should be validated by a majority of contributors
    }

    function approveRequest() public {
        // Contributors can approve a request made by the manager
    }

    function finalizeRequest() public restricted {
        // Transfer the money to the creator of the campaign
    }

    function getSummary() public view {
        // Allow to display a campaigns summary : creator, number of contributors, balance, number of requests [...]
    }

    function getRequestsCount() public view {
        // Allow to get the number of requests
    }
}
