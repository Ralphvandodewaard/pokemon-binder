import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../api/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { Card } from '../models/card';
import { Set } from '../models/set';
import { Size } from '../models/size';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  loadingSets = true;

  loadingCards = false;

  errorMessage = '';

  sets: Set[] = [];

  cards: Card[] = [];

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
      description: 'Exclude holo V rares'
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
    this.errorMessage = '';
    if (this.selectedSet && this.selectedSize) {
      this.loadingCards = true;
      await this.getCards(this.selectedSet.id);
      this.loadingCards = false;
    } else {
      if (!this.selectedSet) {
        this.errorMessage = 'Please select a set';
      } else if (!this.selectedSize) {
        this.errorMessage = 'Please select a binder page size';
      }
    }
  }
}
