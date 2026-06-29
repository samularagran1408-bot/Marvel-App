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
  imageError: boolean = false;

  constructor(private heroService: HeroService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHeroById(parseInt(id, 10));
    }
  }

  onImageError(): void {
    this.imageError = true;
  }

  loadHeroById(id: number) {
    this.loading = true;
    this.error = null;
    this.hero = null;
    this.imageError = false;

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
    if (this.imageError) {
      return 'assets/default-hero.png';
    }
    
    if (!this.hero) {
      console.warn('Hero is null or undefined');
      return 'assets/default-hero.png';
    }

    const imageUrl = this.hero.image?.url
                     '';

    if (!imageUrl) {
      console.warn(`No image found for hero: ${this.hero.name}`);
      return 'assets/default-hero.png';
    }

    return imageUrl;
  }

  getFullName(): string {
    return this.hero?.biography?.['full-name'] || this.hero?.name || 'Unknown';
  }

  getPublisher(): string {
    return this.hero?.biography?.publisher || 'Unknown Publisher';
  }

  getAlignment(): string {
    return this.hero?.biography?.alignment || 'Unknown';
  }

  getGender(): string {
    return this.hero?.appearance?.gender || 'Unknown';
  }

  getRace(): string {
    return this.hero?.appearance?.race || 'Unknown';
  }

  getHairColor(): string {
    return this.hero?.appearance?.['hair-color'] || 'Unknown';
  }

  getEyeColor(): string {
    return this.hero?.appearance?.['eye-color'] || 'Unknown';
  }

  getHeight(): string {
    const height = this.hero?.appearance?.height;
    if (height && height.length > 0 && height[0] !== '-') {
      return height[0];
    }
    return 'Unknown';
  }

  getWeight(): string {
    const weight = this.hero?.appearance?.weight;
    if (weight && weight.length > 0 && weight[0] !== '-') {
      return weight[0];
    }
    return 'Unknown';
  }

  getFirstAppearance(): string {
    return this.hero?.biography?.['first-appearance'] || 'Unknown';
  }

  getPlaceOfBirth(): string {
    return this.hero?.biography?.['place-of-birth'] || 'Unknown';
  }

  getOccupation(): string {
    return this.hero?.work?.occupation || 'Unknown';
  }

  getBase(): string {
    return this.hero?.work?.base || 'Unknown';
  }

  getGroupAffiliation(): string {
    return this.hero?.connections?.['group-affiliation'] || 'Unknown';
  }

  getRelatives(): string {
    return this.hero?.connections?.relatives || 'Unknown';
  }

  getAliases(): string[] {
    const aliases = this.hero?.biography?.aliases || [];
    return aliases.filter(alias => alias !== '-');
  }

  /**
   * Estadísticas
   */
  getPowerstats(): { name: string; value: number; icon: string }[] {
    const stats = this.hero?.powerstats;
    if (!stats) return [];

    const statConfigs = [
      { key: 'intelligence' as const, name: 'Inteligencia', icon: '🧠' },
      { key: 'strength' as const, name: 'Fuerza', icon: '💪' },
      { key: 'speed' as const, name: 'Velocidad', icon: '⚡' },
      { key: 'durability' as const, name: 'Durabilidad', icon: '🛡️' },
      { key: 'power' as const, name: 'Poder', icon: '🔥' },
      { key: 'combat' as const, name: 'Combate', icon: '⚔️' }
    ];

    return statConfigs
      .map(({ key, name, icon }) => ({
        name,
        icon,
        value: Number(stats[key]) || 0 
      }))
      .filter(stat => stat.value > 0);
  }

  getStatColor(value: number): string {
    return this.heroService.getStatColor(value);
  }

  /**
   * Colores 
   */
  getPublisherColor(): string {
    const publisher = this.getPublisher().toLowerCase();
    if (publisher.includes('marvel')) return '#E62429';
    if (publisher.includes('dc')) return '#2C3E7A';
    return '#95A5A6';
  }

  getAlignmentColor(): string {
    const alignment = this.getAlignment().toLowerCase();
    switch (alignment) {
      case 'good': return '#2ECC71';
      case 'bad': return '#E74C3C';
      case 'neutral': return '#F39C12';
      default: return '#95A5A6';
    }
  }

  getGenderColor(): string {
    const gender = this.getGender().toLowerCase();
    if (gender === 'male') return '#3498DB';
    if (gender === 'female') return '#E91E63';
    return '#95A5A6';
  }

  goBack(): void {
    window.history.back();
  }

}
