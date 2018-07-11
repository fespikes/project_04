import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule
  ],
  declarations: [
    CustomersComponent,
    DetailsComponent
  ]
})
export class CustomersModule { }
