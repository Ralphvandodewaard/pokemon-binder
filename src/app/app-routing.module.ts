import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BinderComponent } from './steps/binder/binder.component';
import { SeriesComponent } from './steps/series/series.component';
import { SetComponent } from './steps/set/set.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'series'
      },
      {
        path: 'series',
        component: SeriesComponent
      },
      {
        path: 'set',
        component: SetComponent
      },
      {
        path: 'binder',
        component: BinderComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
