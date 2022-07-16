import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
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
import { BinderComponent } from './binder/binder.component';

import { PlusIconComponent } from 'src/assets/icons/plus-icon/plus-icon.component';
import { DeleteIconComponent } from 'src/assets/icons/delete-icon/delete-icon.component';
import { CheckmarkIconComponent } from 'src/assets/icons/checkmark-icon/checkmark-icon.component';
import { AngleRightIconComponent } from 'src/assets/icons/angle-right-icon/angle-right-icon.component';
import { AngleLeftIconComponent } from 'src/assets/icons/angle-left-icon/angle-left-icon.component';
import { AngleDownIconComponent } from 'src/assets/icons/angle-down-icon/angle-down-icon.component';
import { AngleUpIconComponent } from 'src/assets/icons/angle-up-icon/angle-up-icon.component';
import { BinderCardComponent } from './binder/binder-card/binder-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    OverviewComponent,
    BinderComponent,
    PlusIconComponent,
    DeleteIconComponent,
    CheckmarkIconComponent,
    AngleRightIconComponent,
    AngleLeftIconComponent,
    AngleDownIconComponent,
    AngleUpIconComponent,
    BinderCardComponent
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
