using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;

namespace BlockchainDeveloperBootcampFinalProject.Contracts.NftMarket.ContractDefinition
{
    public partial class MarketItem : MarketItemBase { }

    public class MarketItemBase 
    {
        [Parameter("uint256", "itemId", 1)]
        public virtual BigInteger ItemId { get; set; }
        [Parameter("address", "nftContract", 2)]
        public virtual string NftContract { get; set; }
        [Parameter("uint256", "tokenId", 3)]
        public virtual BigInteger TokenId { get; set; }
        [Parameter("address", "seller", 4)]
        public virtual string Seller { get; set; }
        [Parameter("address", "owner", 5)]
        public virtual string Owner { get; set; }
        [Parameter("uint256", "price", 6)]
        public virtual BigInteger Price { get; set; }
        [Parameter("bool", "sold", 7)]
        public virtual bool Sold { get; set; }
    }
}
