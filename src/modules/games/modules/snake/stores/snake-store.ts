import { defineStore } from 'pinia'

export type SnakeSkin = 'classic' | 'quantum' | 'molecular' | 'legendary'
export type FoodCosmetic = 'element' | 'orb' | 'atom' | 'spark'

type State = {
  selectedSkin: SnakeSkin
  unlockedSkins: SnakeSkin[]
  rewards: string[]
  foodCosmetic: FoodCosmetic
  unlockedFoodCosmetics: FoodCosmetic[]
}

export const useSnakeStore = defineStore('snake-cosmetics', {
  state: (): State => ({
    selectedSkin: 'classic',
    unlockedSkins: ['classic'],
    rewards: [],
    foodCosmetic: 'element',
    unlockedFoodCosmetics: ['element'],
  }),
  actions: {
    unlockSkin(skin: SnakeSkin) {
      if (!this.unlockedSkins.includes(skin)) this.unlockedSkins.push(skin)
    },
    selectSkin(skin: SnakeSkin) {
      if (this.unlockedSkins.includes(skin)) this.selectedSkin = skin
    },
    addReward(name: string) {
      if (!this.rewards.includes(name)) this.rewards.push(name)
    },
    resetSessionRewards() {
      this.rewards = []
    },
    unlockFoodCosmetic(c: FoodCosmetic) {
      if (!this.unlockedFoodCosmetics.includes(c)) this.unlockedFoodCosmetics.push(c)
    },
    selectFoodCosmetic(c: FoodCosmetic) {
      if (this.unlockedFoodCosmetics.includes(c)) this.foodCosmetic = c
    },
  },
  persist: true,
})
