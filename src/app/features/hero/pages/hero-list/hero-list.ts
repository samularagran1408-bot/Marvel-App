import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-list',
  standalone: false,
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
})
export class HeroList implements OnInit {
  heroes: Hero[] = [];
  loading: boolean = false;
  error: string | null = null;
  searchTerm: string = '';
  showSearch: boolean = false;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.loading = true;
    this.error = null;

    this.heroService.loadHeroes().subscribe({
      next: (heroes) => {
        this.heroes = heroes;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los héroes.';
        this.loading = false;
      },
    });
  }

  searchHero(term: string): void {
    this.searchTerm = term;
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.error = null;

      this.heroService.getHeroByName(this.searchTerm).subscribe({
        next: (hero) => {
          this.heroes = hero ? [hero] : [];
          this.loading = false;
          if (!hero) {
            this.error = 'No se encontró ningún heroe con ese nombre.';
          }
        },
        error: (err) => {
          this.error = 'Error al buscar al heroe';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearSearch();
    }
  }
}
