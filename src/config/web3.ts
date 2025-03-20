import { InjectedConnector } from '@web3-react/injected-connector';

// Network types
interface NetworkConfig {
  name: string;
  currency: string;
  explorerUrl: string;
}

// Supported chain IDs
export const supportedChainIds = [
  1, // Ethereum Mainnet
  5, // Goerli Testnet
  137, // Polygon Mainnet
  80001, // Mumbai Testnet
] as const;

export type SupportedChainId = typeof supportedChainIds[number];

// Network configurations
export const NETWORKS: Record<SupportedChainId, NetworkConfig> = {
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

// Connector instance
export const injectedConnector = new InjectedConnector({
  supportedChainIds: supportedChainIds as number[],
}); 