import { Set } from "./set"

export interface Card {
  evolvesFrom?: string,
  evolvesTo?: string[],
  id: string,
  images: {
    large: string,
    small: string
  },
  name: string,
  number: string,
  rarity: string,
  set: Set,
  subtypes: string[],
  types: string[]
}
