/* test/sample-test.js */
describe("NFTMarket, function() {
        it ("Should create and execute market sales", async function() {
                /* deploy the marketplace */
                const Market = await ethers.getContractFactory("NFTMarket")
                const market = await Market.deploy()
                await market.deployed()
                const marketAddress = market.address

                /* deploy the NFT contract */
                const NFT = await ethers.getContractFactory("NFT")
                const nft = await NFT.deploy(marketAddress)
                await nft.deployed()
                const nftContractAddress = nft.address

                let listingPrice = await market.getListingPrice()
                listingPrice = listingPrice.toString()

                const auctionPrice = ethers.utils.parseUnits('1', 'ether')

                /* create two tokens */

        })

})
