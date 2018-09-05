import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import {
  AddComponent as AddCustomerComponent,
} from './components/customers/add/add.component';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './components/layout/layout.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './components/login/login.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomersService } from './components/customers/customers.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    LoginComponent,
    NotFoundComponent,
    AddCustomerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    LoginService,
    CustomersService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCustomerComponent
  ]
})
export class AppModule { }
