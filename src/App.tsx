import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Upgrade from './components/Upgrade';
import CollectibleItem from './components/CollectibleItem';
import { COLLECTIBLE_ITEMS } from './data/collectibles';
import { SET_BONUSES, CollectibleItem as CollectibleItemType, SetType } from './types/items';

// Game container styles
const GameContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #282c34;
  color: white;
`;

const GameArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const SidePanel = styled.div`
  width: 300px;
  background-color: #1a1d23;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.active ? '#2c3e50' : '#34495e'};
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#2c3e50' : '#2c3e50'};
  }
`;

const SetBonusInfo = styled.div`
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
`;

const SetProgress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  font-size: 0.9em;
  color: #bdc3c7;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 24px;
  background-color: #61dafb;
  border: none;
  border-radius: 8px;
  color: #282c34;
  cursor: pointer;
  margin: 20px;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;

const Score = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const PerSecond = styled.div`
  font-size: 18px;
  color: #61dafb;
  margin-bottom: 20px;
`;

interface UpgradeType {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  multiplier: number;
  level: number;
  tokensPerSecond: number;
}

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [tokensPerSecond, setTokensPerSecond] = useState(0);
  const [activeTab, setActiveTab] = useState<'upgrades' | 'collectibles'>('upgrades');
  const [collectibles, setCollectibles] = useState<CollectibleItemType[]>(COLLECTIBLE_ITEMS);
  const [upgrades, setUpgrades] = useState<UpgradeType[]>([
    {
      id: 'autoClicker',
      name: 'Auto Clicker',
      description: 'Automatically clicks once per second',
      baseCost: 10,
      multiplier: 1.15,
      level: 0,
      tokensPerSecond: 1
    },
    {
      id: 'clickPower',
      name: 'Click Power',
      description: 'Increases tokens per click',
      baseCost: 15,
      multiplier: 1.2,
      level: 0,
      tokensPerSecond: 0
    },
    {
      id: 'megaClicker',
      name: 'Mega Clicker',
      description: 'Generates 5 tokens per second',
      baseCost: 50,
      multiplier: 1.3,
      level: 0,
      tokensPerSecond: 5
    }
  ]);

  // Calculate cost for next upgrade level
  const calculateCost = (baseCost: number, multiplier: number, level: number) => {
    return Math.floor(baseCost * Math.pow(multiplier, level));
  };

  // Handle upgrade purchase
  const handleUpgrade = (upgradeId: string) => {
    const upgradeIndex = upgrades.findIndex(u => u.id === upgradeId);
    if (upgradeIndex === -1) return;

    const upgrade = upgrades[upgradeIndex];
    const cost = calculateCost(upgrade.baseCost, upgrade.multiplier, upgrade.level);

    if (score >= cost) {
      setScore(prev => prev - cost);
      
      const newUpgrades = [...upgrades];
      newUpgrades[upgradeIndex] = {
        ...upgrade,
        level: upgrade.level + 1
      };
      setUpgrades(newUpgrades);

      // Update click power or tokens per second
      if (upgradeId === 'clickPower') {
        setClickPower(prev => prev + 1);
      } else {
        const totalTokensPerSecond = newUpgrades.reduce((total, u) => 
          total + (u.tokensPerSecond * u.level), 0);
        setTokensPerSecond(totalTokensPerSecond);
      }
    }
  };

  // Calculate set completion and bonuses
  const calculateSetProgress = (setType: SetType) => {
    const setItems = collectibles.filter(item => item.setType === setType && item.owned);
    return {
      completed: setItems.length,
      required: SET_BONUSES[setType].requiredItems,
      isComplete: setItems.length >= SET_BONUSES[setType].requiredItems
    };
  };

  // Handle collectible purchase
  const handleCollectiblePurchase = (itemId: string) => {
    const itemIndex = collectibles.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;

    const item = collectibles[itemIndex];
    if (item.owned || score < item.cost) return;

    setScore(prev => prev - item.cost);
    const newCollectibles = [...collectibles];
    newCollectibles[itemIndex] = { ...item, owned: true };
    setCollectibles(newCollectibles);

    // Check if this completes a set and apply bonuses
    const setProgress = calculateSetProgress(item.setType);
    if (setProgress.isComplete) {
      const bonus = SET_BONUSES[item.setType].bonus;
      switch (bonus.type) {
        case 'autoClickerSpeed':
          setTokensPerSecond(prev => prev * bonus.value);
          break;
        case 'tokenMultiplier':
          setClickPower(prev => prev * bonus.value);
          break;
        // Other bonus types can be handled here
      }
    }
  };

  // Auto-generate tokens
  useEffect(() => {
    const interval = setInterval(() => {
      if (tokensPerSecond > 0) {
        setScore(prev => prev + tokensPerSecond);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tokensPerSecond]);

  return (
    <GameContainer>
      <GameArea>
        <Score>Tokens: {Math.floor(score)}</Score>
        <PerSecond>Per second: {tokensPerSecond}</PerSecond>
        <Button onClick={() => setScore(prev => prev + clickPower)}>
          Click Me! (+{clickPower})
        </Button>
      </GameArea>
      <SidePanel>
        <TabContainer>
          <Tab
            active={activeTab === 'upgrades'}
            onClick={() => setActiveTab('upgrades')}
          >
            Upgrades
          </Tab>
          <Tab
            active={activeTab === 'collectibles'}
            onClick={() => setActiveTab('collectibles')}
          >
            Collectibles
          </Tab>
        </TabContainer>

        {activeTab === 'upgrades' ? (
          upgrades.map(upgrade => (
            <Upgrade
              key={upgrade.id}
              name={upgrade.name}
              description={upgrade.description}
              cost={calculateCost(upgrade.baseCost, upgrade.multiplier, upgrade.level)}
              level={upgrade.level}
              canAfford={score >= calculateCost(upgrade.baseCost, upgrade.multiplier, upgrade.level)}
              onPurchase={() => handleUpgrade(upgrade.id)}
            />
          ))
        ) : (
          <>
            {Object.entries(SET_BONUSES).map(([setType, bonus]) => {
              const progress = calculateSetProgress(setType as SetType);
              if (progress.completed > 0) {
                return (
                  <SetBonusInfo key={setType}>
                    <h4>{bonus.name}</h4>
                    <p>{bonus.description}</p>
                    <SetProgress>
                      Progress: {progress.completed}/{progress.required}
                      {progress.isComplete && ' (Complete!)'}
                    </SetProgress>
                  </SetBonusInfo>
                );
              }
              return null;
            })}
            {collectibles.map(item => (
              <CollectibleItem
                key={item.id}
                item={item}
                canAfford={score >= item.cost}
                onPurchase={() => handleCollectiblePurchase(item.id)}
              />
            ))}
          </>
        )}
      </SidePanel>
    </GameContainer>
  );
};

export default App; 