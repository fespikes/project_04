import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule, TranslateService } from 'src/app/i18n';
import { SharedModule } from 'src/app/shared';

import { TodosRoutingModule } from './todos-routing.module';

import { TodosComponent } from './todos.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SharedModule,
    TodosRoutingModule
  ],
  declarations: [TodosComponent],
  providers: [
    TranslateService
  ]
})
export class TodosModule { }
