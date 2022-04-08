import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../api/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { Card } from '../models/card';
import { Set } from '../models/set';
import { Size } from '../models/size';
import { Filter } from '../models/filter';
import constants from 'src/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  loadingSets = true;

  loadingCards = false;

  showBinder = false;

  errorMessage = '';

  sets: Set[] = [];

  cards: Card[] = [];

  filteredCards: Card[] = [];

  sizes: Size[] = [
    {
      id: 1,
      width: 2,
      height: 2
    },
    {
      id: 2,
      width: 3,
      height: 3
    },
    {
      id: 3,
      width: 4,
      height: 3
    }
  ];

  filters: Filter[] = [
    {
      id: 1,
      description: 'Leave first page empty'
    },
    {
      id: 2,
      description: 'Start each type on new page'
    },
    {
      id: 3,
      description: 'Exclude commons, uncommons, rares'
    },
    {
      id: 4,
      description: 'Exclude special rares'
    },
    {
      id: 5,
      description: 'Exclude ultra rares'
    },
    {
      id: 6,
      description: 'Exclude secret rares'
    }
  ]

  selectedSet: Set | null = null;

  selectedSize: Size | null = null;

  constructor(
    private pokemon: PokemonService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getSets();
    this.loadingSets = false;
  }

  async getSets(): Promise<void> {
    const data = await firstValueFrom(this.pokemon.getSets());
    this.sets = data.data;
  }

  async getCards(id: string): Promise<void> {
    const data = await firstValueFrom(this.pokemon.getCards(id));
    this.cards = data.data;
  }

  selectSet(set: Set): void {
    this.selectedSet = set;
  }

  selectSize(size: Size): void {
    this.selectedSize = size;
  }

  gridClasses(size: Size): string {
    return `grid-cols-${size.width} grid-rows-${size.height}`;
  }

  toggleFilter(clickedFilter: Filter): void {
    let filter = this.filters.filter((filter: Filter) => filter.id === clickedFilter.id)[0];
    filter.enabled = !filter.enabled;
  }

  async calculate(): Promise<void> {
    if (this.selectedSet && this.selectedSize) {
      if (this.filters.slice(2, 6).some((filter: Filter) => !filter.enabled)) {
        if (
          this.cards.length === 0 ||
          (this.cards.length > 0 && this.cards[0].set.id !== this.selectedSet.id)
        ) {
          this.loadingCards = true;
          await this.getCards(this.selectedSet.id);
        }
        this.filterCards();
        this.loadingCards = false;
        this.showBinder = true;
        this.errorMessage = '';
        this.scrollToTop();
      } else {
        this.errorMessage = 'Cannot exclude all card rarities';
      }
    } else {
      if (!this.selectedSet) {
        this.errorMessage = 'Please select a set';
      } else if (!this.selectedSize) {
        this.errorMessage = 'Please select a binder page size';
      }
    }
  }

  filterCards(): void {
    this.filteredCards = this.cards;
    this.filters.forEach((filter: Filter) => {
      if (filter.enabled) {
        switch (filter.id) {
          case 3:
            this.filteredCards = this.filteredCards.filter((card: Card) =>
              card.rarity.toLowerCase() !== constants.RARITIES.COMMON &&
              card.rarity.toLowerCase() !== constants.RARITIES.UNCOMMON &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO
            );
            break;
          case 4:
            this.filteredCards = this.filteredCards.filter((card: Card) =>
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_V &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_VMAX &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_HOLO_VSTAR
            );
            break;
          case 5:
            this.filteredCards = this.filteredCards.filter((card: Card) =>
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_ULTRA
            );
            break;
          case 6:
            this.filteredCards = this.filteredCards.filter((card: Card) =>
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_SECRET &&
              card.rarity.toLowerCase() !== constants.RARITIES.RARE_RAINBOW
            );
            break;
          default:
            break;
        }
      }
    })
    this.filteredCards.sort((a: Card, b: Card) => Number(a.id.split('-')[1]) - Number(b.id.split('-')[1]));
  }

  back(): void {
    this.showBinder = false;
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  get pageAmount(): number {
    return Math.ceil(this.filteredCards.length / (this.selectedSize!.height * this.selectedSize!.width));
  }
}
