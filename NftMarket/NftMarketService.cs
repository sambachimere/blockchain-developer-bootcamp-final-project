using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Web3;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Contracts;
using System.Threading;
using BlockchainDeveloperBootcampFinalProject.Contracts.NftMarket.ContractDefinition;

namespace BlockchainDeveloperBootcampFinalProject.Contracts.NftMarket
{
    public partial class NftMarketService
    {
        public static Task<TransactionReceipt> DeployContractAndWaitForReceiptAsync(Nethereum.Web3.Web3 web3, NftMarketDeployment nftMarketDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            return web3.Eth.GetContractDeploymentHandler<NftMarketDeployment>().SendRequestAndWaitForReceiptAsync(nftMarketDeployment, cancellationTokenSource);
        }

        public static Task<string> DeployContractAsync(Nethereum.Web3.Web3 web3, NftMarketDeployment nftMarketDeployment)
        {
            return web3.Eth.GetContractDeploymentHandler<NftMarketDeployment>().SendRequestAsync(nftMarketDeployment);
        }

        public static async Task<NftMarketService> DeployContractAndGetServiceAsync(Nethereum.Web3.Web3 web3, NftMarketDeployment nftMarketDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            var receipt = await DeployContractAndWaitForReceiptAsync(web3, nftMarketDeployment, cancellationTokenSource);
            return new NftMarketService(web3, receipt.ContractAddress);
        }

        protected Nethereum.Web3.Web3 Web3{ get; }

        public ContractHandler ContractHandler { get; }

        public NftMarketService(Nethereum.Web3.Web3 web3, string contractAddress)
        {
            Web3 = web3;
            ContractHandler = web3.Eth.GetContractHandler(contractAddress);
        }

        public Task<string> CreateMarketNftRequestAsync(CreateMarketNftFunction createMarketNftFunction)
        {
             return ContractHandler.SendRequestAsync(createMarketNftFunction);
        }

        public Task<TransactionReceipt> CreateMarketNftRequestAndWaitForReceiptAsync(CreateMarketNftFunction createMarketNftFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(createMarketNftFunction, cancellationToken);
        }

        public Task<string> CreateMarketNftRequestAsync(string nftContract, BigInteger tokenId, BigInteger price)
        {
            var createMarketNftFunction = new CreateMarketNftFunction();
                createMarketNftFunction.NftContract = nftContract;
                createMarketNftFunction.TokenId = tokenId;
                createMarketNftFunction.Price = price;
            
             return ContractHandler.SendRequestAsync(createMarketNftFunction);
        }

        public Task<TransactionReceipt> CreateMarketNftRequestAndWaitForReceiptAsync(string nftContract, BigInteger tokenId, BigInteger price, CancellationTokenSource cancellationToken = null)
        {
            var createMarketNftFunction = new CreateMarketNftFunction();
                createMarketNftFunction.NftContract = nftContract;
                createMarketNftFunction.TokenId = tokenId;
                createMarketNftFunction.Price = price;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(createMarketNftFunction, cancellationToken);
        }

        public Task<string> CreateMarketSaleRequestAsync(CreateMarketSaleFunction createMarketSaleFunction)
        {
             return ContractHandler.SendRequestAsync(createMarketSaleFunction);
        }

        public Task<TransactionReceipt> CreateMarketSaleRequestAndWaitForReceiptAsync(CreateMarketSaleFunction createMarketSaleFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(createMarketSaleFunction, cancellationToken);
        }

        public Task<string> CreateMarketSaleRequestAsync(string nftContract, BigInteger itemId)
        {
            var createMarketSaleFunction = new CreateMarketSaleFunction();
                createMarketSaleFunction.NftContract = nftContract;
                createMarketSaleFunction.ItemId = itemId;
            
             return ContractHandler.SendRequestAsync(createMarketSaleFunction);
        }

        public Task<TransactionReceipt> CreateMarketSaleRequestAndWaitForReceiptAsync(string nftContract, BigInteger itemId, CancellationTokenSource cancellationToken = null)
        {
            var createMarketSaleFunction = new CreateMarketSaleFunction();
                createMarketSaleFunction.NftContract = nftContract;
                createMarketSaleFunction.ItemId = itemId;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(createMarketSaleFunction, cancellationToken);
        }

        public Task<FetchMarketNftsOutputDTO> FetchMarketNftsQueryAsync(FetchMarketNftsFunction fetchMarketNftsFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<FetchMarketNftsFunction, FetchMarketNftsOutputDTO>(fetchMarketNftsFunction, blockParameter);
        }

        public Task<FetchMarketNftsOutputDTO> FetchMarketNftsQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<FetchMarketNftsFunction, FetchMarketNftsOutputDTO>(null, blockParameter);
        }

        public Task<FetchMyNftsOutputDTO> FetchMyNftsQueryAsync(FetchMyNftsFunction fetchMyNftsFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<FetchMyNftsFunction, FetchMyNftsOutputDTO>(fetchMyNftsFunction, blockParameter);
        }

        public Task<FetchMyNftsOutputDTO> FetchMyNftsQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<FetchMyNftsFunction, FetchMyNftsOutputDTO>(null, blockParameter);
        }

        public Task<FetchNftsCreatedOutputDTO> FetchNftsCreatedQueryAsync(FetchNftsCreatedFunction fetchNftsCreatedFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<FetchNftsCreatedFunction, FetchNftsCreatedOutputDTO>(fetchNftsCreatedFunction, blockParameter);
        }

        public Task<FetchNftsCreatedOutputDTO> FetchNftsCreatedQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<FetchNftsCreatedFunction, FetchNftsCreatedOutputDTO>(null, blockParameter);
        }

        public Task<BigInteger> GetListingPriceQueryAsync(GetListingPriceFunction getListingPriceFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetListingPriceFunction, BigInteger>(getListingPriceFunction, blockParameter);
        }

        
        public Task<BigInteger> GetListingPriceQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetListingPriceFunction, BigInteger>(null, blockParameter);
        }
    }
}
