import { InjectedConnector } from '@web3-react/injected-connector';

// Supported chain IDs
export const supportedChainIds = [
  1, // Ethereum Mainnet
  5, // Goerli Testnet
  137, // Polygon Mainnet
  80001, // Mumbai Testnet
];

// Connector instance
export const injectedConnector = new InjectedConnector({
  supportedChainIds,
});

// Network configurations
export const NETWORKS = {
  1: {
    name: 'Ethereum Mainnet',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
  },
  5: {
    name: 'Goerli Testnet',
    currency: 'ETH',
    explorerUrl: 'https://goerli.etherscan.io',
  },
  137: {
    name: 'Polygon Mainnet',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
  },
  80001: {
    name: 'Mumbai Testnet',
    currency: 'MATIC',
    explorerUrl: 'https://mumbai.polygonscan.com',
  },
}; 