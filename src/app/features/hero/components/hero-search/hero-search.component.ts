import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hero-search',
  standalone: false,
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
})
export class HeroSearch {
  @Input() searchTerm = '';
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  onClear(): void {
    this.searchTerm = '';
    this.clear.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
