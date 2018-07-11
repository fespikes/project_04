import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Routes,
  PreloadAllModules,
} from '@angular/router';

import { I18nModule, TranslateDeactivator, TranslateResolver, TranslateToken } from '../../i18n';

import { CustomersComponent } from './customers.component';
import { DetailsComponent } from './details/details.component';

const customersRoutes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(customersRoutes)
  ],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'customers',
    },
  ]
})
export class CustomersRoutingModule { }
