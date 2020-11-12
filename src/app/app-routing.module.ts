import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [ // order matter here, first match wins
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' }, //pathMatch full, so the ENTIRE url matches "localhost:4200". Otherwise it matches "localhost:4200/random" as well
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      // ,
      // { enableTracing: true } // <-- debugging purposes only)
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
