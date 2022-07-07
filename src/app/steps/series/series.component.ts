import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';
import { Series, Set } from 'src/app/models';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html'
})
export class SeriesComponent implements OnInit {
  isLoading = false;

  sets: Set[] = [];

  series: Series[] = [];

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.sets = await this.store.getAllSets();
    this.series = this.store.getSeries();
    this.isLoading = false;
  }

  navigateToSet(series: string): void {
    this.store.selectedSeries = series;
    this.router.navigate(['/new/set']);
  }

}
