import { Injectable } from '@angular/core';
import { PokemonService } from '../api/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { Series, Set, Size } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  allSets: Set[] = [];

  series: Series[] = [];

  selectedSeries: string | null = null;

  setsInSeries: Set[] = [];

  selectedSet: Set | null = null;

  selectedSize: Size | null = null;

  constructor(
    private pokemon: PokemonService
  ) { }

  async getAllSets(): Promise<Set[]> {
    if (this.allSets.length > 0) {
      return this.allSets;
    }

    const data = await firstValueFrom(this.pokemon.getAllSets());
    this.allSets = data;
    return this.allSets;
  }

  getSetsInSeries(): Set[] {
    if (this.setsInSeries.length > 0 && this.setsInSeries[0].series === this.selectedSeries) {
      return this.setsInSeries;
    }

    this.setsInSeries = this.allSets.filter((set: Set) => set.series === this.selectedSeries);
    return this.setsInSeries;
  }

  getSeries(): Series[] {
    if (this.series.length > 0) {
      return this.series;
    }

    this.allSets.forEach((set: Set) => {
      if (
        set.id.includes('1') &&
        set.series.toLowerCase() !== 'other' &&
        set.series.toLowerCase() !== 'pop' &&
        this.series.filter((series: Series) => series.name === set.series).length === 0
      ) {
        const payload = {
          logo: set.images.logo,
          name: set.series,
          releaseDate: set.releaseDate
        }
        this.series.push(payload);
      }
    })

    return this.series;
  }

}
