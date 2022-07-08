import { Size } from "./size";

export interface Preset {
  set: {
    id: string,
    logo: string,
    name: string
  },
  size: Size,
  style: string
}
