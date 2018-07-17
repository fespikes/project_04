import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {
  TranslateResolver,
  TranslateDeactivator,
  TranslateToken,
} from './i18n';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
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
      {
        path: 'opportunities',
        loadChildren: './components/opportunities/opportunities.module#OpportunitiesModule',
      },
      {
        path: 'todos',
        loadChildren: './components/todos/todos.module#TodosModule',
      },
      {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full',
      },
    ],
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
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
