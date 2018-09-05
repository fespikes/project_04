import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TuiModalService } from 'tdc-ui';
import { TranslateService } from '../../i18n';

import { SharedModule } from '../../shared';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { DetailsComponent } from './details/details.component';
import { CustomersService } from './customers.service';
// import { AddComponent } from './add/add.component';
import { CancelComponent } from './cancel/cancel.component';
import { ActivateComponent } from './activate/activate.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    CustomersRoutingModule
  ],
  declarations: [
    CustomersComponent,
    DetailsComponent,
    // AddComponent,
    CancelComponent,
    ActivateComponent,
    EditComponent
  ],
  providers: [
    TranslateService,
    TuiModalService,
    CustomersService,
  ],
  entryComponents: [
    // AddComponent,
    CancelComponent,
    ActivateComponent,
    EditComponent
  ]
})
export class CustomersModule { }
