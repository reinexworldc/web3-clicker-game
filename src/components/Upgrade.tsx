import React from 'react';
import styled from 'styled-components';

interface UpgradeProps {
  name: string;
  cost: number;
  level: number;
  description: string;
  canAfford: boolean;
  onPurchase: () => void;
}

const UpgradeContainer = styled.div<{ canAfford: boolean }>`
  background-color: #34495e;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  cursor: ${props => props.canAfford ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.canAfford ? 1 : 0.7};
  transition: transform 0.2s;

  &:hover {
    transform: ${props => props.canAfford ? 'scale(1.02)' : 'none'};
  }
`;

const UpgradeName = styled.h3`
  margin: 0;
  color: #3498db;
`;

const UpgradeDescription = styled.p`
  margin: 5px 0;
  color: #bdc3c7;
  font-size: 0.9em;
`;

const UpgradeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Cost = styled.span`
  color: #2ecc71;
  font-weight: bold;
`;

const Level = styled.span`
  color: #e74c3c;
  font-weight: bold;
`;

const Upgrade: React.FC<UpgradeProps> = ({
  name,
  cost,
  level,
  description,
  canAfford,
  onPurchase
}) => {
  return (
    <UpgradeContainer canAfford={canAfford} onClick={canAfford ? onPurchase : undefined}>
      <UpgradeName>{name}</UpgradeName>
      <UpgradeDescription>{description}</UpgradeDescription>
      <UpgradeInfo>
        <Cost>Cost: {cost} tokens</Cost>
        <Level>Level: {level}</Level>
      </UpgradeInfo>
    </UpgradeContainer>
  );
};

export default Upgrade; 