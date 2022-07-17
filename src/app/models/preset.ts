export interface Preset {
  id: number,
  set: {
    id: string,
    name?: string,
    logo?: string
  }
  size: {
    width: number,
    height: number
  },
  style: string,
  filters?: {
    pokemon: boolean,
    trainers: boolean,
    energies: boolean,
    common: boolean,
    uncommon: boolean,
    rare: boolean,
    ultraRare: boolean,
    secretRare: boolean
  },
  sortBy?: string
}
