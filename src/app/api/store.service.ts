import { Injectable } from '@angular/core';
import { PokemonService } from '../api/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { Card, Binder, Series, Set, Size, Style } from '../models';
import constants from '../shared/constants';

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

  selectedBinder: Binder | null = null;

  cards: Card[] = [];

  sizes: Size[] = [
    { width: 2, height: 2 },
    { width: 3, height: 3 },
    { width: 4, height: 3 }
  ];

  styles: Style[] = [
    {
      label: 'Collection',
      isCollection: true,
      description: "Cards not in your collection will be grayed out by default. Click on a card's checkmark to save it to your collection. This data persists across binders."
    },
    {
      label: 'View',
      isCollection: false,
      description: 'All cards in this binder will be displayed as if they were collected.'
    }
  ];

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

    this.setsInSeries = this.allSets.filter((set: Set) =>
      set.series === this.selectedSeries!.name &&
      !set.id.includes('mcd') &&
      !set.id.includes('tk')
    );

    this.setsInSeries = this.setsInSeries.reverse();

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

    this.series = this.series.reverse();

    return this.series;
  }

  async getCards(): Promise<Card[]> {
    const setId = this.selectedBinder ? this.selectedBinder.set.id : this.selectedSet!.id;

    if (this.cards.length > 0 && this.cards[0].id.split('-')[0] === setId) {
      return this.cards;
    }

    let data = await firstValueFrom(this.pokemon.getCards(setId));
    this.cards = data;

    if (this.cards.length >= 250) {
      data = await firstValueFrom(this.pokemon.getCards(setId, 2));
      this.cards = this.cards.concat(data);
    }
  
    this.cards.forEach((card: Card) => {
      card.number = card.number.replace(/\D/g,'');

      if (card.rarity) {
        switch (card.rarity.toLowerCase()) {
          case constants.RARITIES.COMMON:
            card.raritySortingIndex = 1;
            break;
          case constants.RARITIES.UNCOMMON:
            card.raritySortingIndex = 2;
            break;
          case constants.RARITIES.RARE:
          case constants.RARITIES.RARE_HOLO:
            card.raritySortingIndex = 3;
            break;
          case constants.RARITIES.LEGEND:
          case constants.RARITIES.RADIANT_RARE:
          case constants.RARITIES.RARE_ACE:
          case constants.RARITIES.RARE_BREAK:
          case constants.RARITIES.RARE_HOLO_EX:
          case constants.RARITIES.RARE_HOLO_GX:
          case constants.RARITIES.RARE_HOLO_LVX:
          case constants.RARITIES.RARE_HOLO_STAR:
          case constants.RARITIES.RARE_HOLO_V:
          case constants.RARITIES.RARE_HOLO_VMAX:
          case constants.RARITIES.RARE_HOLO_VSTAR:
          case constants.RARITIES.RARE_PRIME:
          case constants.RARITIES.RARE_PRISM_STAR:
          case constants.RARITIES.RARE_SHINY:
          case constants.RARITIES.RARE_SHINY_GX:
          case constants.RARITIES.RARE_ULTRA:
            card.raritySortingIndex = 4;
            break;
          case constants.RARITIES.RARE_RAINBOW:
          case constants.RARITIES.RARE_SECRET:
          case constants.RARITIES.RARE_SHINING:
            card.raritySortingIndex = 5;
            break;
          default:
            card.raritySortingIndex = 6;
            break;
        }
      } else {
        card.raritySortingIndex = 6;
      }

      if (card.types) {
        switch (card.types[0].toLowerCase()) {
          case constants.TYPES.GRASS:
            card.typeSortingIndex = 1;
            break;
          case constants.TYPES.FIRE:
            card.typeSortingIndex = 2;
            break;
          case constants.TYPES.WATER:
            card.typeSortingIndex = 3;
            break;
          case constants.TYPES.LIGHTNING:
            card.typeSortingIndex = 4;
            break;
          case constants.TYPES.PSYCHIC:
            card.typeSortingIndex = 5;
            break;
          case constants.TYPES.FIGHTING:
            card.typeSortingIndex = 6;
            break;
          case constants.TYPES.DARKNESS:
            card.typeSortingIndex = 7;
            break;
          case constants.TYPES.METAL:
            card.typeSortingIndex = 8;
            break;
          case constants.TYPES.FAIRY:
            card.typeSortingIndex = 9;
            break;
          case constants.TYPES.DRAGON:
            card.typeSortingIndex = 10;
            break;
          case constants.TYPES.COLORLESS:
            card.typeSortingIndex = 11;
            break;
        }
      } else {
        card.typeSortingIndex = 12;
      }
    })

    return this.cards;
  }

}
