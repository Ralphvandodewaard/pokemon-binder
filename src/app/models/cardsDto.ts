import { Card } from "./card";

export interface CardsDto {
  count: number,
  data: Card[],
  page: number,
  pageSize: number,
  totalCount: number
}
