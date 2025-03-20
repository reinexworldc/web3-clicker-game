import React from 'react';
import styled from 'styled-components';
import { useWeb3 } from '../hooks/useWeb3';
import { NETWORKS, SupportedChainId } from '../config/web3';

const WalletContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #2c3e50;
  padding: 15px;
  border-radius: 8px;
  color: white;
  z-index: 1000;
`;

const WalletButton = styled.button<{ isConnected: boolean }>`
  background-color: ${props => props.isConnected ? '#e74c3c' : '#2ecc71'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const WalletInfo = styled.div`
  margin-top: 10px;
  font-size: 0.9em;
`;

const NetworkBadge = styled.span`
  background-color: #3498db;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  margin-left: 10px;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 10px;
  font-size: 0.9em;
`;

const Address = styled.div`
  color: #bdc3c7;
  font-family: monospace;
  margin-top: 5px;
`;

const Balance = styled.div`
  color: #2ecc71;
  margin-top: 5px;
  font-weight: bold;
`;

const WalletInfoComponent: React.FC = () => {
  const { connect, disconnect, active, account, balance, error, chainId } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = () => {
    if (!chainId || !(chainId in NETWORKS)) return 'Unknown Network';
    return NETWORKS[chainId as SupportedChainId].name;
  };

  const getNetworkCurrency = () => {
    if (!chainId || !(chainId in NETWORKS)) return '';
    return NETWORKS[chainId as SupportedChainId].currency;
  };

  return (
    <WalletContainer>
      <WalletButton
        isConnected={active}
        onClick={active ? disconnect : connect}
      >
        {active ? 'Disconnect Wallet' : 'Connect Wallet'}
      </WalletButton>

      {active && account && (
        <WalletInfo>
          <div>
            Connected
            <NetworkBadge>{getNetworkName()}</NetworkBadge>
          </div>
          <Address>{formatAddress(account)}</Address>
          <Balance>
            {parseFloat(balance).toFixed(4)} {getNetworkCurrency()}
          </Balance>
        </WalletInfo>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </WalletContainer>
  );
};

export default WalletInfoComponent; 