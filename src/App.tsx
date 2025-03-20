import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Upgrade from './components/Upgrade';

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

const UpgradesPanel = styled.div`
  width: 300px;
  background-color: #1a1d23;
  padding: 20px;
  overflow-y: auto;
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
      <UpgradesPanel>
        <h2>Upgrades</h2>
        {upgrades.map(upgrade => (
          <Upgrade
            key={upgrade.id}
            name={upgrade.name}
            description={upgrade.description}
            cost={calculateCost(upgrade.baseCost, upgrade.multiplier, upgrade.level)}
            level={upgrade.level}
            canAfford={score >= calculateCost(upgrade.baseCost, upgrade.multiplier, upgrade.level)}
            onPurchase={() => handleUpgrade(upgrade.id)}
          />
        ))}
      </UpgradesPanel>
    </GameContainer>
  );
};

export default App; 