import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TuiModule, TuiMessageService } from 'tdc-ui';

import { I18nModule } from '../i18n';


import {
  ImgSrcDirective,
} from './components/';

@NgModule({
  imports: [
    I18nModule,
    CommonModule,
    FormsModule,
    I18nModule,
    ReactiveFormsModule,
    TuiModule,
  ],
  declarations: [
    ImgSrcDirective
    // ......
  ],
  providers: [
    TuiMessageService
  ],
  exports: [
    // ....
    TuiModule,
    I18nModule,
    ImgSrcDirective
  ],
  entryComponents: [
    // ...
  ],
})
export class SharedModule { }
