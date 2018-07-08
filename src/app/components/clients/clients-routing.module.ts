import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { I18nModule, TranslateDeactivator, TranslateResolver, TranslateToken } from '../../i18n';

import { ClientsComponent } from './clients.component';

const clientRoutes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientRoutes)
  ],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'clients',
    }
  ]
})
export class ClientsRoutingModule { }
