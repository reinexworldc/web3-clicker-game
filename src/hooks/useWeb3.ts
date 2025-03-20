import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injectedConnector } from '../config/web3';

export const useWeb3 = () => {
  const context = useWeb3React<Web3Provider>();
  const { connector, account, chainId, provider } = context;
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');

  // Connect wallet
  const connect = async () => {
    try {
      await connector?.activate(injectedConnector);
      setError(null);
    } catch (err) {
      setError('Failed to connect wallet. Please make sure MetaMask is installed and unlocked.');
      console.error('Connection error:', err);
    }
  };

  // Disconnect wallet
  const disconnect = async () => {
    try {
      await connector?.deactivate();
      setError(null);
    } catch (err) {
      console.error('Disconnection error:', err);
    }
  };

  // Get account balance
  const getBalance = async () => {
    if (provider && account) {
      try {
        const balance = await provider.getBalance(account);
        setBalance(balance.toString());
      } catch (err) {
        console.error('Balance fetch error:', err);
      }
    }
  };

  // Update balance when account or chain changes
  useEffect(() => {
    if (context.active && account) {
      getBalance();
    }
  }, [context.active, account, chainId]);

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return {
    connect,
    disconnect,
    active: context.active,
    account,
    balance,
    error,
    chainId
  };
};

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
} 