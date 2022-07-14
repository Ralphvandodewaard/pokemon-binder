import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../api/store.service';
import { Card, Set, Size, Style } from '../models';

@Component({
  selector: 'app-binder',
  templateUrl: './binder.component.html'
})
export class BinderComponent implements OnInit {
  isLoading = true;

  selectedSet: Set | null = null;

  selectedSize: Size | null = null;

  selectedStyle: Style | null = null

  cards: Card[] = [];

  currentPageLeft = 0;

  currentPageRight = 1;

  binderInfo: { label: string, value: string | number }[] = [];

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (
      !this.store.selectedSet ||
      !this.store.selectedSize ||
      !this.store.selectedStyle
      ) {
      this.router.navigate(['/']);
      return;
    }

    this.selectedSet = this.store.selectedSet;
    this.selectedSize = this.store.selectedSize;
    this.selectedStyle = this.store.selectedStyle;
    this.cards = await this.store.getCards();
    this.binderInfo = [
      { label: 'Series', value: this.selectedSet!.series },
      { label: 'Set', value: this.selectedSet!.name },
      { label: 'Cards', value: this.selectedSet!.printedTotal },
      { label: 'Pages', value: this.pageAmount },
    ];

    this.isLoading = false;
  }

  getPageClasses(page: Card[]): string {
    if (page.length == 0) {
      return 'hidden';
    } else {
      const orderClass = this.pages[0].length == 0 ? 'order-2' : 'order-1';
      const gridClasses = `grid-cols-${this.selectedSize!.width} grid-rows-${this.selectedSize!.height}`;
      return `${orderClass} ${gridClasses}`;
    }
  }

  get orderClass(): string {
    return this.pages[0].length == 0 ? 'order-1' : 'order-2';
  }
  
  get emptyPageClasses(): string {
    const widthClasses = `w-page-${this.selectedSize!.width}-mobile mobile:w-page-${this.selectedSize!.width}-desktop`;
    const heightClasses = `h-page-${this.selectedSize!.height}-mobile mobile:h-page-${this.selectedSize!.height}-desktop`;

    return `${widthClasses} ${heightClasses}`;
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
    return this.selectedSize!.width * this.selectedSize!.height;
  }

  get controlsWidth(): string {
    switch (this.selectedSize!.width) {
      case 2:
        return '616px';
      case 3:
        return '904px';
      default:
        return '1192px';
    }
  }

  get pageAmount(): number {
    return Math.ceil(this.cards.length / (this.selectedSize!.width * this.selectedSize!.height));
  }

  goToPage(page: string) {
    switch (page) {
      case 'first':
        this.currentPageLeft = 0;
        this.currentPageRight = 1;
        break;
      case 'last':
        const isEven = this.pageAmount % 2 == 0;
        this.currentPageLeft = isEven ? this.pageAmount : this.pageAmount - 1;
        this.currentPageRight = !isEven ? this.pageAmount : this.pageAmount + 1;
        break;
      case 'previous':
        if (this.currentPageLeft > 0) {
          this.currentPageLeft = this.currentPageLeft - 2;
          this.currentPageRight = this.currentPageRight - 2;
        }
        break;
      default:
        if (this.currentPageRight < (this.cards.length / this.pageSize)) {
          this.currentPageLeft = this.currentPageLeft + 2;
          this.currentPageRight = this.currentPageRight + 2;
        }
        break;
    }
  }

}
