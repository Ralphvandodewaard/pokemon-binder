import { Set } from "./set";

export interface SetsDto {
  count: number,
  data: Set[],
  page: number,
  pageSize: number,
  totalCount: number
}
