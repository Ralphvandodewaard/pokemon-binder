import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';
import { Set } from 'src/app/models';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html'
})
export class SetComponent implements OnInit {
  isLoading = false;

  sets: Set[] = [];

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.store.selectedSeries) {
      this.router.navigate(['/new']);
      return;
    }

    this.isLoading = true;
    this.sets = this.store.getSetsInSeries();
    this.isLoading = false;
  }

  navigateToBinder(set: Set): void {
    this.store.selectedSet = set;
    this.router.navigate(['/new/size']);
  }

}
