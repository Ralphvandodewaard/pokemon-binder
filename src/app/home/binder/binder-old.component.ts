import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Size } from 'src/app/models/size';

@Component({
  selector: 'app-binder-old',
  templateUrl: './binder-old.component.html'
})
export class BinderOldComponent implements OnInit {
  @Input() cards!: Card[];

  @Input() size!: Size;

  currentPageLeft = 0;

  currentPageRight = 1;

  constructor() { }

  ngOnInit(): void {
  }

  get sizeStyles(): string {
    const height = (this.size.height * 178.672) + ((this.size.height - 1) * 8) + (2 * 16);
    const width = (this.size.width * 128) + ((this.size.width - 1) * 8) + (2 * 16);
    return `height: ${height}px; width: ${width}px;`;
  }

  get gridClasses(): string {
    return `grid-cols-${this.size.width} grid-rows-${this.size.height}`;
  }

  get pages(): Card[][] {
    return [this.cardsLeft, this.cardsRight];
  }

  get cardsLeft(): Card[] {
    if (this.currentPageLeft > 0) {
      return this.cards.slice((this.currentPageLeft * this.pageSize) - this.pageSize, this.currentPageLeft * this.pageSize);
    } else {
      return [];
    }
  }

  get cardsRight(): Card[] {
    if (this.currentPageRight > 0) {
      return this.cards.slice((this.currentPageRight * this.pageSize) - this.pageSize, this.currentPageRight * this.pageSize);
    } else {
      return [];
    }
  }

  get pageSize(): number {
    return this.size.height * this.size.width;
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