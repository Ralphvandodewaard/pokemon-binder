import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';
import { Binder, Series, Set, Size, Style } from 'src/app/models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  selectedSeries: Series | null = null;

  selectedSet: Set | null = null;

  selectedSize: Size | null = null;

  selectedStyle: Style | null = null;

  saveBinder = false;

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.store.selectedStyle) {
      this.router.navigate(['/new']);
      return;
    }

    this.selectedSeries = this.store.selectedSeries;
    this.selectedSet = this.store.selectedSet;
    this.selectedSize = this.store.selectedSize;
    this.selectedStyle = this.store.selectedStyle;
  }

  get sizeLabel(): string {
    return `${this.selectedSize!.height}x${this.selectedSize!.width}`;
  }

  navigateBack(setting: string): void {
    this.router.navigate([`/new/${setting}`]);
  }

  toggleSaveBinder(): void {
    this.saveBinder = !this.saveBinder;
  }

  navigateToBinder(): void {
    if (this.saveBinder) {
      let binders: Binder[] = [];
      if (localStorage.getItem('saved-binders')) {
        binders = JSON.parse(localStorage.getItem('saved-binders')!);
      }

      let binderId = 1;
      if (binders.length > 0) {
        binderId = binders[binders.length - 1].id + 1;
      }

      const payload: Binder = {
        id: binderId,
        set: {
          id: this.selectedSet!.id
        },
        size: {
          width: this.selectedSize!.width,
          height: this.selectedSize!.height
        },
        style: this.selectedStyle!.label
      }

      binders.push(payload);
      localStorage.setItem('saved-binders', JSON.stringify(binders));

      this.store.selectedBinder = payload;
    } else {
      this.store.selectedBinder = null;
    }

    this.router.navigate(['/binder']);
  }

}
