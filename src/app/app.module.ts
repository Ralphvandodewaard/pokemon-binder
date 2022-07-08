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
import { SizeComponent } from './steps/size/size.component';
import { StyleComponent } from './steps/style/style.component';
import { CardComponent } from './shared/binder-image/card/card.component';
import { OverviewComponent } from './steps/overview/overview.component';

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
    SizeComponent,
    StyleComponent,
    CardComponent,
    OverviewComponent
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
