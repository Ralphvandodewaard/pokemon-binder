import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BinderOldComponent } from './home/binder/binder-old.component';
import { HeaderComponent } from './shared/header/header.component';
import { SeriesComponent } from './steps/series/series.component';
import { ButtonComponent } from './shared/button/button.component';
import { BinderImageComponent } from './shared/binder-image/binder-image.component';
import { SetComponent } from './steps/set/set.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { StepWrapperComponent } from './shared/step-wrapper/step-wrapper.component';
import { BinderComponent } from './steps/binder/binder.component';
import { RaritiesComponent } from './steps/rarities/rarities.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BinderOldComponent,
    HeaderComponent,
    SeriesComponent,
    ButtonComponent,
    BinderImageComponent,
    SetComponent,
    LoadingComponent,
    StepWrapperComponent,
    BinderComponent,
    RaritiesComponent
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
