import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TuiModule, TuiMessageService } from 'tdc-ui';

import { I18nModule } from '../i18n';

import { HttpErrorHandler, ReqService } from './services';
import {
  ImgSrcDirective,
} from './components';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';

@NgModule({
  imports: [
    I18nModule,
    RouterModule,
    CommonModule,
    FormsModule,
    I18nModule,
    ReactiveFormsModule,
    TuiModule,
  ],
  declarations: [
    ImgSrcDirective,
    BreadCrumbsComponent
    // ......
  ],
  providers: [
    TuiMessageService,
    HttpErrorHandler,
    ReqService
  ],
  exports: [
    CommonModule,
    TuiModule,
    I18nModule,
    FormsModule,
    ImgSrcDirective,
    BreadCrumbsComponent,
    ReactiveFormsModule,

  ],
  entryComponents: [
    // ...
  ],
})
export class SharedModule { }
