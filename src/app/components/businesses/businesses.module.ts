import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule, TranslateService } from 'src/app/i18n';
import { SharedModule } from 'src/app/shared';

import { BusinessesComponent } from './businesses.component';
import { BusinessesRoutingModule } from './businesses-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SharedModule,
    BusinessesRoutingModule
  ],
  declarations: [BusinessesComponent, DetailsComponent],
  providers: [
    TranslateService
  ]
})
export class BusinessesModule { }
