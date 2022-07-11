import { Injectable } from '@angular/core';
import { PokemonService } from '../api/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { Card, Series, Set, Size, Style } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  allSets: Set[] = [];

  series: Series[] = [];

  selectedSeries: Series | null = null;

  setsInSeries: Set[] = [];

  selectedSet: Set | null = null;

  selectedSize: Size | null = null;

  selectedStyle: Style | null = null;

  cards: Card[] = [];

  constructor(
    private pokemon: PokemonService
  ) { }

  async getAllSets(): Promise<Set[]> {
    if (this.allSets.length > 0) {
      return this.allSets;
    }

    const data = await firstValueFrom(this.pokemon.getAllSets());
    this.allSets = data;
    return this.allSets;
  }

  getSetsInSeries(): Set[] {
    if (this.setsInSeries.length > 0 && this.setsInSeries[0].series === this.selectedSeries!.name) {
      return this.setsInSeries;
    }

    this.setsInSeries = this.allSets.filter((set: Set) => set.series === this.selectedSeries!.name);
    return this.setsInSeries;
  }

  getSeries(): Series[] {
    if (this.series.length > 0) {
      return this.series;
    }

    this.allSets.forEach((set: Set) => {
      if (
        set.id.includes('1') &&
        set.series.toLowerCase() !== 'other' &&
        set.series.toLowerCase() !== 'pop' &&
        this.series.filter((series: Series) => series.name === set.series).length === 0
      ) {
        const payload = {
          logo: set.images.logo,
          name: set.series,
        }
        this.series.push(payload);
      }
    })

    return this.series;
  }

  async getCards(): Promise<Card[]> {
    if (this.cards.length > 0 && this.cards[0].id.split('-')[0] === this.selectedSet!.id) {
      return this.cards;
    }

    let data = await firstValueFrom(this.pokemon.getCards(this.selectedSet!.id));
    this.cards = data;

    if (this.cards.length >= 250) {
      data = await firstValueFrom(this.pokemon.getCards(this.selectedSet!.id, 2));
      this.cards = this.cards.concat(data);
    }
    return this.cards;
  }

}
