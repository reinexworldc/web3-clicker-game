import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { injectedConnector } from '../config/web3';

export const useWeb3 = () => {
  const { activate, active, account, library, deactivate, chainId } = useWeb3React<ethers.providers.Web3Provider>();
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');

  // Connect wallet
  const connect = async () => {
    try {
      await activate(injectedConnector);
      setError(null);
    } catch (err) {
      setError('Failed to connect wallet. Please make sure MetaMask is installed and unlocked.');
      console.error('Connection error:', err);
    }
  };

  // Disconnect wallet
  const disconnect = async () => {
    try {
      deactivate();
      setError(null);
    } catch (err) {
      console.error('Disconnection error:', err);
    }
  };

  // Get account balance
  const getBalance = async () => {
    if (library && account) {
      try {
        const balance = await library.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
      } catch (err) {
        console.error('Balance fetch error:', err);
      }
    }
  };

  // Update balance when account or chain changes
  useEffect(() => {
    if (active && account) {
      getBalance();
    }
  }, [active, account, chainId]);

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          deactivate();
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
    active,
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