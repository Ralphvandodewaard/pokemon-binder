import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/api/store.service';
import { Preset, Series, Set, Size, Style } from 'src/app/models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  selectedSeries: Series | null = null;

  selectedSet: Set | null = null;

  selectedSize: Size | null = null;

  selectedStyle: Style | null = null;

  saveAsPreset = false;

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

  toggleSaveAsPreset(): void {
    this.saveAsPreset = !this.saveAsPreset;
  }

  navigateToBinder(): void {
    if (this.saveAsPreset) {
      let presets: Preset[] = [];
      if (localStorage.getItem('presets')) {
        presets = JSON.parse(localStorage.getItem('presets')!);
      }

      let presetId = 1;
      if (presets.length > 0) {
        presetId = presets[presets.length - 1].id + 1;
      }

      const payload: Preset = {
        id: presetId,
        set: {
          id: this.selectedSet!.id
        },
        size: {
          width: this.selectedSize!.width,
          height: this.selectedSize!.height
        },
        style: this.selectedStyle!.label
      }

      presets.push(payload);
      localStorage.setItem('presets', JSON.stringify(presets));

      this.store.selectedPreset = payload;
    } else {
      this.store.selectedPreset = null;
    }

    this.router.navigate(['/binder']);
  }

}
