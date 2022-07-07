import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BinderComponent } from './home/binder/binder.component';
import { HeaderComponent } from './shared/header/header.component';
import { SeriesComponent } from './steps/series/series.component';
import { ButtonComponent } from './shared/button/button.component';
import { BinderImageComponent } from './shared/binder-image/binder-image.component';
import { SetComponent } from './steps/set/set.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BinderComponent,
    HeaderComponent,
    SeriesComponent,
    ButtonComponent,
    BinderImageComponent,
    SetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
