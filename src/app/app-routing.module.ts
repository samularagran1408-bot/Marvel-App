import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // ✅ Importar RouterModule

const routes: Routes = [
  { 
    path: 'heroes', 
    loadChildren: () => import('./features/hero/hero.module').then(m => m.SuperheroModule) 
  },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', redirectTo: '/heroes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }