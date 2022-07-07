import { Injectable } from '@angular/core';
import { PokemonService } from '../api/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { Series, Set } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  sets: Set[] = [];

  series: Series[] = [];

  selectedSeries: string | null = null;

  constructor(
    private pokemon: PokemonService
  ) { }

  async getSets(): Promise<Set[]> {
    if (this.sets.length > 0) {
      return this.sets;
    }

    const data = await firstValueFrom(this.pokemon.getSets());
    this.sets = data;
    return this.sets;
  }

  getSeries(): Series[] {
    if (this.series.length > 0) {
      return this.series;
    }

    this.sets.forEach((set: Set) => {
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
