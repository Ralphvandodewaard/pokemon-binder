import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';
import { Size, Style } from 'src/app/models';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html'
})
export class StyleComponent implements OnInit {
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
  ]

  selectedSize: Size | null = null;

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.store.selectedSize) {
      this.router.navigate(['/new']);
      return;
    }

    this.selectedSize = this.store.selectedSize;
  }

  navigateToOverview(style: Style): void {
    this.store.selectedStyle = style;
    this.router.navigate(['/new/overview']);
  }
}
