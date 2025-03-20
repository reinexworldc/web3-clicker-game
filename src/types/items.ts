// Item rarity types
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// Set bonus types
export type SetType = 'clockwork' | 'luck' | 'ancient' | 'nature';

// Interface for set bonuses
export interface SetBonus {
  type: SetType;
  name: string;
  description: string;
  requiredItems: number;
  bonus: {
    type: 'autoClickerSpeed' | 'luckChance' | 'tokenMultiplier' | 'criticalChance';
    value: number;
  };
}

// Interface for collectible items
export interface CollectibleItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  rarity: Rarity;
  setType: SetType;
  owned: boolean;
  image: string;
}

// Available set bonuses
export const SET_BONUSES: Record<SetType, SetBonus> = {
  clockwork: {
    type: 'clockwork',
    name: 'Clockwork Mastery',
    description: 'Auto-clickers work 50% faster',
    requiredItems: 3,
    bonus: {
      type: 'autoClickerSpeed',
      value: 1.5
    }
  },
  luck: {
    type: 'luck',
    name: 'Lucky Charm',
    description: '5% chance to get free upgrades',
    requiredItems: 3,
    bonus: {
      type: 'luckChance',
      value: 0.05
    }
  },
  ancient: {
    type: 'ancient',
    name: 'Ancient Power',
    description: 'All token gains increased by 25%',
    requiredItems: 4,
    bonus: {
      type: 'tokenMultiplier',
      value: 1.25
    }
  },
  nature: {
    type: 'nature',
    name: 'Nature\'s Blessing',
    description: '10% chance for critical clicks (2x tokens)',
    requiredItems: 3,
    bonus: {
      type: 'criticalChance',
      value: 0.10
    }
  }
}; 