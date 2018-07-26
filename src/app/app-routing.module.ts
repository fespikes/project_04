import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {
  TranslateResolver,
  TranslateDeactivator,
  TranslateToken,
} from './i18n';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuardService],
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
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot([
  {
      path: '',
      resolve: [TranslateResolver],
      canDeactivate: [TranslateDeactivator],
      children: appRoutes,
    },
  ], {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'common',
    },
  ]
})
export class AppRoutingModule { }
