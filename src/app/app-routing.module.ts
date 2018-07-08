import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {
  TranslateResolver,
  TranslateDeactivator,
  TranslateToken,
} from './i18n';

import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: 'login',
      //   loadChildren: './login/customers.module#CustomersModule',
      // },
      {
        path: 'customers',
        loadChildren: './components/customers/customers.module#CustomersModule',
      },
      {
        path: 'clients',
        loadChildren: './components/clients/clients.module#ClientsModule',
      },
      {
        path: 'businesses',
        loadChildren: './components/businesses/businesses.module#BusinessesModule',
      },
    ],
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'common',
    },
  ]
})
export class AppRoutingModule { }
