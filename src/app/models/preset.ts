import { Set } from "./set";
import { Size } from "./size";
import { Style } from "./style";

export interface Preset {
  id: number,
  set: Set,
  size: Size,
  style: Style,
  filters?: {
    common: boolean,
    uncommon: boolean,
    rare: boolean,
    ultraRare: boolean,
    secretRare: boolean
  }
}
