import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { I18nModule, TranslateDeactivator, TranslateResolver, TranslateToken } from '../../i18n';
import { BusinessesComponent } from './businesses.component';
import { DetailsComponent } from './details/details.component';
import { ProgressComponent } from './progress/progress.component';

const businessesRoutes: Routes = [
  {
    path: '',
    component: BusinessesComponent,
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator]
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'progress/:id',
    component: ProgressComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(businessesRoutes)
  ],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'businesses',
    }
  ]
})
export class BusinessesRoutingModule { }
