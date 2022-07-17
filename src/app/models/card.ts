import { Set } from "./set"

export interface Card {
  id: string,
  images: {
    large: string,
    small: string
  },
  name: string,
  number: string,
  rarity: string,
  raritySortingIndex?: number,
  set: Set,
  subtypes: string[],
  supertype: string,
  types?: string[]
  typeSortingIndex?: number
}
