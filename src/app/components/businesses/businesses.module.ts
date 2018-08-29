import { NgModule } from '@angular/core';
import { I18nModule, TranslateService } from '../../i18n';
import { SharedModule } from '../../shared';

import { BusinessesComponent } from './businesses.component';
import { BusinessesRoutingModule } from './businesses-routing.module';
import { DetailsComponent } from './details/details.component';
import { BusinessesService } from './businesses.service';
import { AddComponent } from './add/add.component';
import { ActivateComponent } from './activate/activate.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  imports: [
    I18nModule,
    SharedModule,
    BusinessesRoutingModule
  ],
  declarations: [
    BusinessesComponent,
    DetailsComponent,
    AddComponent,
    ActivateComponent,
    ProgressComponent,

  ],
  providers: [
    BusinessesService,
    TranslateService
  ],
  entryComponents: [
    AddComponent,
    ActivateComponent
  ]
})
export class BusinessesModule { }
