import { CollectibleItem } from '../types/items';

export const COLLECTIBLE_ITEMS: CollectibleItem[] = [
  // Clockwork Set
  {
    id: 'clockworkGear',
    name: 'Clockwork Gear',
    description: 'A perfectly crafted gear that never stops turning',
    cost: 1000,
    rarity: 'rare',
    setType: 'clockwork',
    owned: false,
    image: '⚙️'
  },
  {
    id: 'clockworkPendulum',
    name: 'Eternal Pendulum',
    description: 'Swings in perfect harmony with time itself',
    cost: 1500,
    rarity: 'epic',
    setType: 'clockwork',
    owned: false,
    image: '🕰️'
  },
  {
    id: 'clockworkCore',
    name: 'Mechanical Core',
    description: 'The heart of all clockwork machinery',
    cost: 2000,
    rarity: 'epic',
    setType: 'clockwork',
    owned: false,
    image: '⭐'
  },

  // Lucky Set
  {
    id: 'luckyPenny',
    name: 'Lucky Penny',
    description: 'A coin that always lands on heads',
    cost: 800,
    rarity: 'uncommon',
    setType: 'luck',
    owned: false,
    image: '🪙'
  },
  {
    id: 'luckyClover',
    name: 'Four-Leaf Clover',
    description: 'Brings good fortune to its owner',
    cost: 1200,
    rarity: 'rare',
    setType: 'luck',
    owned: false,
    image: '🍀'
  },
  {
    id: 'luckyDice',
    name: 'Fortune\'s Dice',
    description: 'Always rolls in your favor',
    cost: 1800,
    rarity: 'epic',
    setType: 'luck',
    owned: false,
    image: '🎲'
  },

  // Ancient Set
  {
    id: 'ancientScroll',
    name: 'Ancient Scroll',
    description: 'Contains forgotten knowledge of token generation',
    cost: 2500,
    rarity: 'epic',
    setType: 'ancient',
    owned: false,
    image: '📜'
  },
  {
    id: 'ancientRelic',
    name: 'Token Relic',
    description: 'Radiates with ancient power',
    cost: 3000,
    rarity: 'epic',
    setType: 'ancient',
    owned: false,
    image: '🏺'
  },
  {
    id: 'ancientCrown',
    name: 'Crown of Ages',
    description: 'Worn by the rulers of the token empire',
    cost: 5000,
    rarity: 'legendary',
    setType: 'ancient',
    owned: false,
    image: '👑'
  },
  {
    id: 'ancientOrb',
    name: 'Orb of Power',
    description: 'Pulses with mysterious energy',
    cost: 4000,
    rarity: 'legendary',
    setType: 'ancient',
    owned: false,
    image: '🔮'
  },

  // Nature Set
  {
    id: 'natureCrystal',
    name: 'Earth Crystal',
    description: 'Harnesses the power of nature',
    cost: 1500,
    rarity: 'rare',
    setType: 'nature',
    owned: false,
    image: '💎'
  },
  {
    id: 'natureEssence',
    name: 'Forest Essence',
    description: 'Pure energy of the ancient woods',
    cost: 2000,
    rarity: 'epic',
    setType: 'nature',
    owned: false,
    image: '🌳'
  },
  {
    id: 'natureSeed',
    name: 'Seed of Life',
    description: 'Grows into powerful token trees',
    cost: 2500,
    rarity: 'epic',
    setType: 'nature',
    owned: false,
    image: '🌱'
  }
]; 