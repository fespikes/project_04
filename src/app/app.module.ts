import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { TuiModule, TuiMessageService } from 'tdc-ui';
import {
  I18nModule,
  TranslateService,
  TranslateResolver,
  TranslateToken,
  I18nLangService,
} from './i18n';
import { IconModule } from '../assets/icons/icon.module';
import { ErpApiService } from './shared';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './components/layout/layout.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TuiModule,
    I18nModule,
    IconModule,
    SharedModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [
    ErpApiService,
    I18nLangService,
    TuiMessageService,
    TranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
