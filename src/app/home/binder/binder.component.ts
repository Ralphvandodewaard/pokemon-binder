import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-binder',
  templateUrl: './binder.component.html'
})
export class BinderComponent implements OnInit {
  @Input() cards!: Card[];

  pageWidth = 3;

  pageHeight = 3;

  currentPageLeft = 0;

  currentPageRight = 1;

  constructor() { }

  ngOnInit(): void {
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
