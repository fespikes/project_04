import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { I18nModule } from '../../i18n';
import { SharedModule } from '../../shared';
// import { LayoutComponent } from './layout.component';
// import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    // LayoutComponent,
    // HeaderComponent
  ]
})
export class LayoutModule { }
