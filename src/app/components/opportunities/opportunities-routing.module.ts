import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { I18nModule, TranslateDeactivator, TranslateResolver, TranslateToken } from '../../i18n';
import { OpportunitiesComponent } from './opportunities.component';

const opportunitiesRoutes: Routes = [
  {
    path: '',
    component: OpportunitiesComponent,
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(opportunitiesRoutes)
  ],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'opportunities',
    }
  ]
})
export class OpportunitiesRoutingModule { }
