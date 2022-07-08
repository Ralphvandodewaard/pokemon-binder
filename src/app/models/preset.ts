import { Size } from "./size";

export interface Preset {
  set: {
    id: string,
    logo: string
  },
  size: Size,
  style: string
}
