import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CardsDto, Set, SetsDto } from '../models';
import constants from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(
    private http: HttpClient
  ) { }

  getAllSets(): Observable<Set[]> {
    return this.http
    .get<SetsDto>(`${constants.API_URL}/sets`)
    .pipe(
      map((data: SetsDto) => data.data)
    );
  }

  getCards(id: string, page: number = 1): Observable<CardsDto> {
    return this.http
    .get<CardsDto>(`${constants.API_URL}/cards?q=set.id:${id}&page=${page}`);
  }

}
