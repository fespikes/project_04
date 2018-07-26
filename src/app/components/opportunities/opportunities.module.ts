import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule, TranslateService } from '../../i18n';
import { SharedModule } from '../../shared';

import { OpportunitiesComponent } from './opportunities.component';
import { OpportunitiesRoutingModule } from './opportunities-routing.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SharedModule,
    OpportunitiesRoutingModule
  ],
  declarations: [OpportunitiesComponent],
  providers: [
    TranslateService
  ]
})
export class OpportunitiesModule { }
