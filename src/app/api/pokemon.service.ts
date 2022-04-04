import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsDto } from '../models/cardsDto';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://api.pokemontcg.io/v2';

  constructor(
    private http: HttpClient
  ) { }

  getCards(): Observable<CardsDto> {
    return this.http
    .get<CardsDto>(`${this.baseUrl}/cards?&q=set.id:"swsh5"`);
  }
}
