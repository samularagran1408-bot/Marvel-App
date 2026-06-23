import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly API_URL = 'https://akabab.github.io/superhero-api/api';

  constructor(private http: HttpClient) {}

  loadHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.API_URL}/all.json`).pipe(
      map((heroes) => heroes ?? []),
      catchError((error) => {
        console.error('Error al cargar los héroes:', error);
        return of([]);
      })
    );
  }

  getHeroDetail(url: string): Observable<Hero | null> {
    return this.http.get<Hero>(url).pipe(
      catchError((error) => {
        console.error(`Error al obtener los detalles de la url: ${url}:`, error);
        return of(null);
      })
    );
  }

  getHeroesById(id: number): Observable<Hero | null> {
    return this.http.get<Hero>(`${this.API_URL}/id/${id}.json`).pipe(
      catchError((error) => {
        console.error(`Error fetching hero with ID ${id}:`, error);
        return of(null);
      })
    );
  }

  getHeroByName(name: string): Observable<Hero | null> {
    return this.http.get<Hero>(`${this.API_URL}/search/${name}.json`).pipe(
      catchError((error) => {
        console.error(`Error fetching hero with name ${name}:`, error);
        return of(null);
      })
    );
  }
}
