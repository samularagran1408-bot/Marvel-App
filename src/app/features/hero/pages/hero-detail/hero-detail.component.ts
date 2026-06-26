import { Component } from '@angular/core';
import { HeroService } from '../../service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-hero-detail',
  standalone: false,
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetail {

  hero: Hero | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private heroService: HeroService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHeroById(parseInt(id, 10));
    }
  }

  loadHeroById(id: number) {
    this.loading = true;
    this.error = null;
    this.hero = null;

    this.heroService.getHeroesById(id).subscribe({
      next: (data) => {
        this.hero = data;
        this.loading = false;
        if (!data) {
          this.error = "No se encontró el heroe por ID";
        }
      },
    });
  }

  getHeroImage(): string {
    if (!this.hero) {
      console.warn('Hero is null or undefined');
      return 'assets/default-hero.png';
    }

    const imageUrl = this.hero.image?.url;
    if (!imageUrl) {
      console.warn(`No image found for hero: ${this.hero.name}`);
      return 'assets/default-hero.png';
    }

    return imageUrl;
  }

  getStatColor(value: number): string {
    return this.heroService.getStatColor(value);
  }

  goBack(): void {
    window.history.back();
  }
}
