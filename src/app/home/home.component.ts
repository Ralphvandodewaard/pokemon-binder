import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  cards: any[] = [];

  pageWidth = 3;

  pageHeight = 3;

  currentPageLeft = 0;

  currentPageRight = 1;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.http
    .get<any>(`https://api.pokemontcg.io/v2/cards?&q=set.id:"swsh5"`)
    .subscribe(data => {
      this.cards = data.data;
    })
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
