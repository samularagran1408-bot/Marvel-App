import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-card',
  standalone: false,
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCard {
  @Input() hero! : Hero;
  imageError: boolean = false;

  constructor(private heroService: HeroService) {}

  getStatsColor(value: number): string {
    return this.heroService.getStatColor(value);
  }

  getHeroImage(): string {
    if (this.imageError) {
      return '';
    }
    return this.hero?.image?.url || '';
  }

  onImageError(): void {
    this.imageError = true;
  }

  getHeroName(): string {
    return this.hero?.name || 'Unknown Hero';
  }

  getFullName(): string {
    return this.hero?.biography?.['full-name'] || this.getHeroName();
  }

  getPublisher(): string {
    return this.hero?.biography?.publisher || 'Unknown Publisher';
  }

  getAllignment(): string {
    return this.hero?.biography?.alignment || 'Unknown';
  }

  getAliases(): string[] {
    const aliases = this.hero?.biography?.aliases || [];
    return aliases.filter(alias => alias !== '-').slice(0, 3);
  }

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

  hasPowerstats(): boolean {
    const stats = this.hero?.powerstats;
    if (!stats) return false;
    return Object.values(stats).some(v => v !== undefined && v !== null && v > 0);
  }

  getRace(): string {
    return this.hero?.appearance?.race || 'Unknown';
  }

  getGender(): string {
    return this.hero?.appearance?.gender || 'Unknown';
  }

  getHairColor(): string {
    return this.hero?.appearance?.['hair-color'] || 'Unknown';
  }

  getFirstAppearance(): string {
    return this.hero?.biography?.['first-appearance'] || 'Unknown';
  }

  getAlignmentColor(): string {
    const alignment = this.getAllignment();
    switch (alignment.toLowerCase()) {
      case 'good':
        return '#2ECC71';
      case 'bad':
        return '#E74C3C';
      case 'neutral':
        return '#F39C12';
      default:
        return '#95A5A6';
    }
  }

  getPublisherColor(): string {
    const publisher = this.getPublisher().toLowerCase();
    if (publisher.includes('marvel')) {
      return '#E62429';
    }
    if (publisher.includes('dc')) {
      return '#2C3E7A';
    }
    if (publisher.includes('dark horse')) {
      return '#E67E22';
    }
    if (publisher.includes('image')) {
      return '#27AE60';
    }
    return '#95A5A6';
  }

  getGenderColor(): string {
    const gender = this.getGender().toLowerCase();
    if (gender === 'male') {
      return '#3498DB';
    }
    if (gender === 'female') {
      return '#E91E63';
    }
    return '#95A5A6';
  }

  getHeroId(): string {
    return this.hero?.id?.toString() || '';
  }

  getStatPercentage(value: number): number {
    return Math.min(Math.max(value, 0), 100);
  }
}
