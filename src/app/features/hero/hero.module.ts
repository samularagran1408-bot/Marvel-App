import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroRoutingModule } from '../hero/hero-routing.module';
import { HeroList } from './pages/hero-list/hero-list.component';
import { HeroDetail } from './pages/hero-detail/hero-detail.component';
import { HeroCard } from './components/hero-card/hero-card.component';
import { HeroSearch } from './components/hero-search/hero-search.component';

@NgModule({
  declarations: [
    HeroList,
    HeroDetail,
    HeroCard,
    HeroSearch 
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroRoutingModule
  ],
  exports: [
    HeroSearch
  ]
})
export class SuperheroModule { }