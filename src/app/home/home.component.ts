import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../api/store.service';
import { Binder, Series, Set } from '../models';
// import constants from '../shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isLoading = true;

  binders: Binder[] = [];

  sets: Set[] = [];

  series: Series[] = [];

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.sets = await this.store.getAllSets();
    this.series = this.store.getSeries();
    
    if (localStorage.getItem('saved-binders')) {
      this.binders = JSON.parse(localStorage.getItem('saved-binders')!);

      this.binders.forEach((binder: Binder) => {
        const set: Set = this.sets.filter((set: Set) => set.id === binder.set.id)[0];
        binder.set.logo = set.images.logo;
        binder.set.name = set.name;
      })
    }

    this.isLoading = false;
  }

  deleteBinder(index: number): void {
    this.binders.splice(index, 1);
    localStorage.setItem('saved-binders', JSON.stringify(this.binders));
  }

  navigateToNew(): void {
    this.router.navigate(['/new']);
  }

  navigateToBinder(binder: Binder): void {
    this.store.selectedBinder = binder;

    this.router.navigate(['/binder']);
  }
}
