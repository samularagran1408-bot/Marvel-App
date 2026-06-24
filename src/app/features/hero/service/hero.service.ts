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

  /**
   * Busca héroes por nombre (búsqueda parcial)
   * La API de akabab no tiene búsqueda nativa, así que se filtra localmente
   */
  searchHeroes(query: string): Observable<Hero[]> {
    if (!query || query.trim() === '') {
      return this.loadHeroes(); // Si no hay query, devuelve todos
    }

    return this.loadHeroes().pipe(
      map(heroes => {
        const searchTerm = query.toLowerCase().trim();
        return heroes.filter(hero => 
          hero.name.toLowerCase().includes(searchTerm) ||
          hero.biography["full-name"]?.toLowerCase().includes(searchTerm) ||
          hero.biography.aliases?.some(alias => 
            alias.toLowerCase().includes(searchTerm)
          )
        );
      })
    );
  }

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

  getHeroesByPublisher(publisher: string): Observable<Hero[]> {
    return this.loadHeroes().pipe(
      map(heroes => heroes.filter(hero =>
        hero.biography.publisher?.toLowerCase() === publisher.toLowerCase()
      ))
    );
  }

  getMarvelHeroes(): Observable<Hero[]> {
    return this.getHeroesByPublisher('Marvel Comics');
  }

  getDCHeroes(): Observable<Hero[]> {
    return this.getHeroesByPublisher('DC Comics');
  }

  getHeroesByAlignment(alignment: string): Observable<Hero[]> {
    return this.loadHeroes().pipe(
      map(heroes => heroes.filter(hero => 
        hero.biography.alignment?.toLowerCase() === alignment.toLowerCase()
      ))
    );
  }

  getGoodHeroes(): Observable<Hero[]> {
    return this.getHeroesByAlignment('good');
  }

  getBadHeroes(): Observable<Hero[]> {
    return this.getHeroesByAlignment('bad');
  }

  getHeroesByGender(gender: string): Observable<Hero[]> {
    return this.loadHeroes().pipe(
      map(heroes => heroes.filter(hero => 
        hero.appearance.gender?.toLowerCase() === gender.toLowerCase()
      ))
    );
  }

  getMaleHeroes(): Observable<Hero[]> {
    return this.getHeroesByGender('Male');
  }

  getFemaleHeroes(): Observable<Hero[]> {
    return this.getHeroesByGender('Female');
  }

  getStatColor(value: number): string {
    if (value >= 150) return '#4CAF50';
    if (value >= 100) return '#8BC34A';
    if (value >= 50) return '#FFC107';
    return '#FF5722';
  }
}
