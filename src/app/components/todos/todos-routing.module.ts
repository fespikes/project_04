import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { I18nModule, TranslateDeactivator, TranslateResolver, TranslateToken } from '../../i18n';
import { TodosComponent } from './todos.component';

const todosRoutes: Routes = [
  {
    path: '',
    component: TodosComponent,
    resolve: [TranslateResolver],
    canDeactivate: [TranslateDeactivator]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(todosRoutes)
  ],
  exports: [RouterModule],
  providers: [
    TranslateResolver,
    TranslateDeactivator,
    {
      provide: TranslateToken,
      useValue: 'todos',
    }
  ]
})
export class TodosRoutingModule { }
