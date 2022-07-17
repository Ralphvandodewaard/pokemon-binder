import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';
import { Size, Style } from 'src/app/models';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html'
})
export class StyleComponent implements OnInit {
  styles: Style[] = [];

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

    this.styles = this.store.styles;
    this.selectedSize = this.store.selectedSize;
  }

  navigateToOverview(style: Style): void {
    this.store.selectedStyle = style;
    this.router.navigate(['/new/overview']);
  }
}
