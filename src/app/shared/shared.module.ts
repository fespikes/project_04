import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { I18nModule } from '../i18n';
import { TuiModule } from 'tdc-ui';

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
    // ......
  ],
  providers: [
  ],
  exports: [
    // ....
    I18nModule
  ],
  entryComponents: [
    // ...
  ],
})
export class SharedModule { }
