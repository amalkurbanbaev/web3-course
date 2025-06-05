import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TradeContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const tradeContractAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: '_feeBasisPoints', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tradeOffer',
        internalType: 'struct TrustlessOTC.TradeOffer',
        type: 'tuple',
        components: [
          { name: 'tokenFrom', internalType: 'address', type: 'address' },
          { name: 'tokenTo', internalType: 'address', type: 'address' },
          { name: 'amountFrom', internalType: 'uint256', type: 'uint256' },
          { name: 'amountTo', internalType: 'uint256', type: 'uint256' },
          { name: 'creator', internalType: 'address payable', type: 'address' },
          { name: 'optionalTaker', internalType: 'address', type: 'address' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'completed', internalType: 'bool', type: 'bool' },
          { name: 'tradeID', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: true,
      },
    ],
    name: 'OfferCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tradeOffer',
        internalType: 'struct TrustlessOTC.TradeOffer',
        type: 'tuple',
        components: [
          { name: 'tokenFrom', internalType: 'address', type: 'address' },
          { name: 'tokenTo', internalType: 'address', type: 'address' },
          { name: 'amountFrom', internalType: 'uint256', type: 'uint256' },
          { name: 'amountTo', internalType: 'uint256', type: 'uint256' },
          { name: 'creator', internalType: 'address payable', type: 'address' },
          { name: 'optionalTaker', internalType: 'address', type: 'address' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'completed', internalType: 'bool', type: 'bool' },
          { name: 'tradeID', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: true,
      },
    ],
    name: 'OfferCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tradeOffer',
        internalType: 'struct TrustlessOTC.TradeOffer',
        type: 'tuple',
        components: [
          { name: 'tokenFrom', internalType: 'address', type: 'address' },
          { name: 'tokenTo', internalType: 'address', type: 'address' },
          { name: 'amountFrom', internalType: 'uint256', type: 'uint256' },
          { name: 'amountTo', internalType: 'uint256', type: 'uint256' },
          { name: 'creator', internalType: 'address payable', type: 'address' },
          { name: 'optionalTaker', internalType: 'address', type: 'address' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'completed', internalType: 'bool', type: 'bool' },
          { name: 'tradeID', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: true,
      },
    ],
    name: 'OfferTaken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceTracker',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'tradeID', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelTrade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'contract IERC20', type: 'address' },
    ],
    name: 'claimFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'feeBasisPoints',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'feeTracker',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'tradeID', internalType: 'uint256', type: 'uint256' }],
    name: 'getOfferDetails',
    outputs: [
      { name: '_tokenFrom', internalType: 'address', type: 'address' },
      { name: '_tokenTo', internalType: 'address', type: 'address' },
      { name: '_amountFrom', internalType: 'uint256', type: 'uint256' },
      { name: '_amountTo', internalType: 'uint256', type: 'uint256' },
      { name: '_creator', internalType: 'address', type: 'address' },
      { name: '_fee', internalType: 'uint256', type: 'uint256' },
      { name: '_optionalTaker', internalType: 'address', type: 'address' },
      { name: '_active', internalType: 'bool', type: 'bool' },
      { name: '_completed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getOptionalTakerTrades',
    outputs: [
      {
        name: '',
        internalType: 'struct TrustlessOTC.TradeOffer[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenFrom', internalType: 'address', type: 'address' },
          { name: 'tokenTo', internalType: 'address', type: 'address' },
          { name: 'amountFrom', internalType: 'uint256', type: 'uint256' },
          { name: 'amountTo', internalType: 'uint256', type: 'uint256' },
          { name: 'creator', internalType: 'address payable', type: 'address' },
          { name: 'optionalTaker', internalType: 'address', type: 'address' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'completed', internalType: 'bool', type: 'bool' },
          { name: 'tradeID', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserTrades',
    outputs: [
      {
        name: '',
        internalType: 'struct TrustlessOTC.TradeOffer[]',
        type: 'tuple[]',
        components: [
          { name: 'tokenFrom', internalType: 'address', type: 'address' },
          { name: 'tokenTo', internalType: 'address', type: 'address' },
          { name: 'amountFrom', internalType: 'uint256', type: 'uint256' },
          { name: 'amountTo', internalType: 'uint256', type: 'uint256' },
          { name: 'creator', internalType: 'address payable', type: 'address' },
          { name: 'optionalTaker', internalType: 'address', type: 'address' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'completed', internalType: 'bool', type: 'bool' },
          { name: 'tradeID', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [
      { name: '_tokenFrom', internalType: 'address', type: 'address' },
      { name: '_tokenTo', internalType: 'address', type: 'address' },
      { name: '_amountFrom', internalType: 'uint256', type: 'uint256' },
      { name: '_amountTo', internalType: 'uint256', type: 'uint256' },
      { name: '_optionalTaker', internalType: 'address', type: 'address' },
    ],
    name: 'initiateTrade',
    outputs: [{ name: 'newTradeID', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'offers',
    outputs: [
      { name: 'tokenFrom', internalType: 'address', type: 'address' },
      { name: 'tokenTo', internalType: 'address', type: 'address' },
      { name: 'amountFrom', internalType: 'uint256', type: 'uint256' },
      { name: 'amountTo', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address payable', type: 'address' },
      { name: 'optionalTaker', internalType: 'address', type: 'address' },
      { name: 'active', internalType: 'bool', type: 'bool' },
      { name: 'completed', internalType: 'bool', type: 'bool' },
      { name: 'tradeID', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'optionalTradeTracker',
    outputs: [
      { name: 'tokenFrom', internalType: 'address', type: 'address' },
      { name: 'tokenTo', internalType: 'address', type: 'address' },
      { name: 'amountFrom', internalType: 'uint256', type: 'uint256' },
      { name: 'amountTo', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address payable', type: 'address' },
      { name: 'optionalTaker', internalType: 'address', type: 'address' },
      { name: 'active', internalType: 'bool', type: 'bool' },
      { name: 'completed', internalType: 'bool', type: 'bool' },
      { name: 'tradeID', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'contract IERC20', type: 'address' },
    ],
    name: 'reclaimToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    constant: false,
    payable: true,
    type: 'function',
    inputs: [{ name: 'tradeID', internalType: 'uint256', type: 'uint256' }],
    name: 'take',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'payable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tradeTracker',
    outputs: [
      { name: 'tokenFrom', internalType: 'address', type: 'address' },
      { name: 'tokenTo', internalType: 'address', type: 'address' },
      { name: 'amountFrom', internalType: 'uint256', type: 'uint256' },
      { name: 'amountTo', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address payable', type: 'address' },
      { name: 'optionalTaker', internalType: 'address', type: 'address' },
      { name: 'active', internalType: 'bool', type: 'bool' },
      { name: 'completed', internalType: 'bool', type: 'bool' },
      { name: 'tradeID', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const tradeContractAddress = {
  80002: '0x89CA69458f187085C10B87D94A8C60a6461F0068',
  11155111: '0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC',
} as const

/**
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const tradeContractConfig = {
  address: tradeContractAddress,
  abi: tradeContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContract = /*#__PURE__*/ createUseReadContract({
  abi: tradeContractAbi,
  address: tradeContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"balanceTracker"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractBalanceTracker =
  /*#__PURE__*/ createUseReadContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'balanceTracker',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"feeBasisPoints"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractFeeBasisPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'feeBasisPoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"feeTracker"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractFeeTracker =
  /*#__PURE__*/ createUseReadContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'feeTracker',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"getOfferDetails"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractGetOfferDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'getOfferDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"getOptionalTakerTrades"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractGetOptionalTakerTrades =
  /*#__PURE__*/ createUseReadContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'getOptionalTakerTrades',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"getUserTrades"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractGetUserTrades =
  /*#__PURE__*/ createUseReadContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'getUserTrades',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"isOwner"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractIsOwner = /*#__PURE__*/ createUseReadContract({
  abi: tradeContractAbi,
  address: tradeContractAddress,
  functionName: 'isOwner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"offers"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractOffers = /*#__PURE__*/ createUseReadContract({
  abi: tradeContractAbi,
  address: tradeContractAddress,
  functionName: 'offers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"optionalTradeTracker"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractOptionalTradeTracker =
  /*#__PURE__*/ createUseReadContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'optionalTradeTracker',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: tradeContractAbi,
  address: tradeContractAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"tradeTracker"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useReadTradeContractTradeTracker =
  /*#__PURE__*/ createUseReadContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'tradeTracker',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tradeContractAbi}__
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWriteTradeContract = /*#__PURE__*/ createUseWriteContract({
  abi: tradeContractAbi,
  address: tradeContractAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"cancelTrade"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWriteTradeContractCancelTrade =
  /*#__PURE__*/ createUseWriteContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'cancelTrade',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"claimFees"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWriteTradeContractClaimFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'claimFees',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"initiateTrade"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWriteTradeContractInitiateTrade =
  /*#__PURE__*/ createUseWriteContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'initiateTrade',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"reclaimToken"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWriteTradeContractReclaimToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'reclaimToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWriteTradeContractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"take"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWriteTradeContractTake = /*#__PURE__*/ createUseWriteContract({
  abi: tradeContractAbi,
  address: tradeContractAddress,
  functionName: 'take',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWriteTradeContractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tradeContractAbi}__
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useSimulateTradeContract = /*#__PURE__*/ createUseSimulateContract(
  { abi: tradeContractAbi, address: tradeContractAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"cancelTrade"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useSimulateTradeContractCancelTrade =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'cancelTrade',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"claimFees"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useSimulateTradeContractClaimFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'claimFees',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"initiateTrade"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useSimulateTradeContractInitiateTrade =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'initiateTrade',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"reclaimToken"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useSimulateTradeContractReclaimToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'reclaimToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useSimulateTradeContractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"take"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useSimulateTradeContractTake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'take',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tradeContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useSimulateTradeContractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tradeContractAbi}__
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWatchTradeContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tradeContractAbi,
    address: tradeContractAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tradeContractAbi}__ and `eventName` set to `"OfferCancelled"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWatchTradeContractOfferCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    eventName: 'OfferCancelled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tradeContractAbi}__ and `eventName` set to `"OfferCreated"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWatchTradeContractOfferCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    eventName: 'OfferCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tradeContractAbi}__ and `eventName` set to `"OfferTaken"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWatchTradeContractOfferTakenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    eventName: 'OfferTaken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tradeContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x89CA69458f187085C10B87D94A8C60a6461F0068)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC)
 */
export const useWatchTradeContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tradeContractAbi,
    address: tradeContractAddress,
    eventName: 'OwnershipTransferred',
  })
