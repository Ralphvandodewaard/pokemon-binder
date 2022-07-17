import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';
import { Size } from 'src/app/models';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html'
})
export class SizeComponent implements OnInit {
  sizes: Size[] = [];

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.store.selectedSet) {
      this.router.navigate(['/new']);
      return;
    }

    this.sizes = this.store.sizes;
  }

  getSizeLabel(size: Size): string {
    return `${size.height}x${size.width}`;
  }

  navigateToRarities(size: Size): void {
    this.store.selectedSize = size;
    this.router.navigate(['/new/style']);
  }

}
