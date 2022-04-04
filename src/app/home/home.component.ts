import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../api/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { Card } from '../models/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  loading = true;

  cards: Card[] = [];

  pageWidth = 3;

  pageHeight = 3;

  currentPageLeft = 0;

  currentPageRight = 1;

  constructor(
    private pokemon: PokemonService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCards();
    this.loading = false;
  }

  async getCards(): Promise<void> {
    const data = await firstValueFrom(this.pokemon.getCards());
    this.cards = data.data;
  }

  get cardsLeft(): any[] {
    if (this.currentPageLeft > 0) {
      return this.cards.slice((this.currentPageLeft * this.pageSize) - this.pageSize, this.currentPageLeft * this.pageSize);
    } else {
      return [];
    }
  }

  get cardsRight(): any[] {
    if (this.currentPageRight > 0) {
      return this.cards.slice((this.currentPageRight * this.pageSize) - this.pageSize, this.currentPageRight * this.pageSize);
    } else {
      return [];
    }
  }

  get pageSize(): number {
    return this.pageWidth * this.pageHeight;
  }

  previousPage(): void {
    if (this.currentPageLeft > 0) {
      this.currentPageLeft = this.currentPageLeft - 2;
      this.currentPageRight = this.currentPageRight - 2;
    }
  }

  nextPage(): void {
    if (this.currentPageRight < (this.cards.length / this.pageSize)) {
      this.currentPageLeft = this.currentPageLeft + 2;
      this.currentPageRight = this.currentPageRight + 2;
    }
  }
}
