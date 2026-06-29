import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-list',
  standalone: false,
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
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
    const normalizedTerm = this.searchTerm.trim();

    if (!normalizedTerm) {
      this.loadHeroes();
      return;
    }

    this.loading = true;
    this.error = null;

    this.heroService.searchHeroes(normalizedTerm).subscribe({
      next: (heroes) => {
        this.heroes = heroes;
        this.loading = false;
        if (heroes.length === 0) {
          this.error = 'No se encontró ningún héroe con ese criterio.';
        }
      },
      error: (err) => {
        this.error = 'Error al buscar al héroe';
        this.loading = false;
        console.error(err);
      },
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadHeroes();
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearSearch();
    }
  }

  retry(): void {
    this.loadHeroes();
  }
}
