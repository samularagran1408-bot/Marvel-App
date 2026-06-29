import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroList } from './pages/hero-list/hero-list.component';
import { HeroDetail } from './pages/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', component: HeroList },
  { path: 'detail/:id', component: HeroDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }