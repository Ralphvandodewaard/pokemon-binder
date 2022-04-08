import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsDto } from '../models/cardsDto';
import { SetsDto } from '../models/setsDto';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://api.pokemontcg.io/v2';

  constructor(
    private http: HttpClient
  ) { }

  getSets(): Observable<SetsDto> {
    return this.http
    .get<SetsDto>(`${this.baseUrl}/sets?q=series:"Sword %26 Shield"`);
  }

  getCards(id: string, page: number = 1): Observable<CardsDto> {
    return this.http
    .get<CardsDto>(`${this.baseUrl}/cards?q=set.id:${id}&page=${page}`);
  }
}
