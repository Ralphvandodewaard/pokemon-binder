import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SizeComponent } from './steps/size/size.component';
import { SeriesComponent } from './steps/series/series.component';
import { SetComponent } from './steps/set/set.component';
import { StyleComponent } from './steps/style/style.component';
import { OverviewComponent } from './steps/overview/overview.component';
import { BinderComponent } from './binder/binder.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'binder',
    component: BinderComponent
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
        path: 'size',
        component: SizeComponent
      },
      {
        path: 'style',
        component: StyleComponent
      },
      {
        path: 'overview',
        component: OverviewComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
