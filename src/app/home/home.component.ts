import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../api/store.service';
import { Preset, Series, Set } from '../models';
// import constants from '../shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isLoading = false;

  presets: Preset[] = [];

  sets: Set[] = [];

  series: Series[] = [];

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    if (localStorage.getItem('presets')) {
      this.presets = JSON.parse(localStorage.getItem('presets')!);
    }

    this.sets = await this.store.getAllSets();
    this.series = this.store.getSeries();

    this.isLoading = false;
  }

  deletePreset(index: number): void {
    this.presets.splice(index, 1);
    localStorage.setItem('presets', JSON.stringify(this.presets));
  }

  navigateToNew(): void {
    this.router.navigate(['/new']);
  }

  navigateToBinder(preset: Preset): void {
    this.store.selectedPreset = preset;

    this.router.navigate(['/binder']);
  }
}
