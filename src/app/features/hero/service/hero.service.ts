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
   * Busca héroes por nombre o por ID. Como la API no ofrece un endpoint de búsqueda
   * fiable para todos los casos, se filtra la lista cargada localmente.
   */
  searchHeroes(query: string): Observable<Hero[]> {
    const searchTerm = query?.trim().toLowerCase() ?? '';

    if (!searchTerm) {
      return this.loadHeroes();
    }

    const parsedId = Number(searchTerm);
    const isNumericSearch = !Number.isNaN(parsedId);

    return this.loadHeroes().pipe(
      map((heroes) =>
        heroes.filter((hero) => {
          const byId = isNumericSearch && hero.id === parsedId;
          const byName = hero.name?.toLowerCase().includes(searchTerm);
          const byFullName = hero.biography?.['full-name']?.toLowerCase().includes(searchTerm);
          const byAlias = Array.isArray(hero.biography?.aliases)
            ? hero.biography.aliases.some((alias) => alias?.toLowerCase().includes(searchTerm))
            : false;

          return byId || byName || byFullName || byAlias;
        })
      )
    );
  }

  loadHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.API_URL}/all.json`).pipe(
      map((heroes) => (Array.isArray(heroes) ? heroes : [])),
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
    return this.loadHeroes().pipe(
      map((heroes) => heroes.find((hero) => hero.id === id) ?? null),
      catchError((error) => {
        console.error(`Error fetching hero with ID ${id}:`, error);
        return of(null);
      })
    );
  }

  getHeroByName(name: string): Observable<Hero | null> {
    const searchTerm = name?.trim().toLowerCase() ?? '';

    if (!searchTerm) {
      return of(null);
    }

    return this.loadHeroes().pipe(
      map((heroes) => {
        return (
          heroes.find((hero) => {
            const byName = hero.name?.toLowerCase() === searchTerm;
            const byFullName = hero.biography?.['full-name']?.toLowerCase() === searchTerm;
            return byName || byFullName;
          }) ?? null
        );
      }),
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
