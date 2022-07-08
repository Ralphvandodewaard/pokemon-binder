import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';
import { Size } from 'src/app/models';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html'
})
export class SizeComponent implements OnInit {
  sizes: Size[] = [
    { width: 2, height: 2 },
    { width: 3, height: 3 },
    { width: 4, height: 3 }
  ]

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.store.selectedSet) {
      this.router.navigate(['/new']);
      return;
    }
  }

  getSizeLabel(size: Size): string {
    return `${size.height}x${size.width}`;
  }

  navigateToRarities(size: Size): void {
    this.store.selectedSize = size;
    this.router.navigate(['/new/style']);
  }

}
