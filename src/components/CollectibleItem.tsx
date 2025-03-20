import React from 'react';
import styled from 'styled-components';
import { CollectibleItem as CollectibleItemType, Rarity } from '../types/items';

interface CollectibleItemProps {
  item: CollectibleItemType;
  canAfford: boolean;
  onPurchase: () => void;
}

const ItemContainer = styled.div<{ rarity: Rarity; owned: boolean; canAfford: boolean }>`
  background-color: ${props => {
    if (props.owned) return '#2c3e50';
    return props.canAfford ? '#34495e' : '#2c3e50';
  }};
  border: 2px solid ${props => {
    switch (props.rarity) {
      case 'common': return '#95a5a6';
      case 'uncommon': return '#2ecc71';
      case 'rare': return '#3498db';
      case 'epic': return '#9b59b6';
      case 'legendary': return '#f1c40f';
      default: return '#95a5a6';
    }
  }};
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  cursor: ${props => (props.owned || !props.canAfford) ? 'default' : 'pointer'};
  opacity: ${props => (!props.canAfford && !props.owned) ? 0.7 : 1};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: ${props => (!props.owned && props.canAfford) ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => (!props.owned && props.canAfford) ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'};
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemName = styled.h3<{ rarity: Rarity }>`
  margin: 0;
  color: ${props => {
    switch (props.rarity) {
      case 'common': return '#95a5a6';
      case 'uncommon': return '#2ecc71';
      case 'rare': return '#3498db';
      case 'epic': return '#9b59b6';
      case 'legendary': return '#f1c40f';
      default: return '#95a5a6';
    }
  }};
`;

const ItemRarity = styled.span`
  font-size: 0.8em;
  color: #7f8c8d;
`;

const ItemDescription = styled.p`
  margin: 5px 0;
  color: #bdc3c7;
  font-size: 0.9em;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Cost = styled.span<{ canAfford: boolean }>`
  color: ${props => props.canAfford ? '#2ecc71' : '#e74c3c'};
  font-weight: bold;
`;

const SetType = styled.span`
  color: #3498db;
  font-size: 0.9em;
`;

const OwnedBadge = styled.span`
  background-color: #27ae60;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8em;
`;

const CollectibleItem: React.FC<CollectibleItemProps> = ({
  item,
  canAfford,
  onPurchase
}) => {
  const handleClick = () => {
    if (!item.owned && canAfford) {
      onPurchase();
    }
  };

  return (
    <ItemContainer
      rarity={item.rarity}
      owned={item.owned}
      canAfford={canAfford}
      onClick={handleClick}
    >
      <ItemHeader>
        <ItemName rarity={item.rarity}>{item.name}</ItemName>
        <ItemRarity>{item.rarity.toUpperCase()}</ItemRarity>
      </ItemHeader>
      <ItemDescription>{item.description}</ItemDescription>
      <ItemFooter>
        {!item.owned ? (
          <Cost canAfford={canAfford}>{item.cost} tokens</Cost>
        ) : (
          <OwnedBadge>OWNED</OwnedBadge>
        )}
        <SetType>Set: {item.setType}</SetType>
      </ItemFooter>
    </ItemContainer>
  );
};

export default CollectibleItem; 