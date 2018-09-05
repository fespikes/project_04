import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TranslateService } from 'src/app/i18n';
import { storageKeys } from 'src/app/shared';
import { TuiModalRef, TuiMessageService, TUI_MODAL_DATA } from 'tdc-ui';
import { BusinessesService } from '../businesses.service';
import { operationTypes, BusinessDetails, Rival } from '../businesses.model';

@Component({
  selector: 'erp-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.sass']
})
export class OperationComponent implements OnInit {
  loading: false; // TODO
  myForm: FormGroup;
  business: BusinessDetails;
  operationType: any = false;
  operationTypes = operationTypes;
  minDate = new Date();
  preSale: any[];
  
  contractTypeEnum: any[];
  statusEnum: any;

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    fb: FormBuilder,
    private modal: TuiModalRef,
    private service: BusinessesService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {
    this.business = data.business;
    this.operationType = data.operationType;
    const operationGroup = BusinessDetails.getOperationGroup(this.operationType);
    this.myForm = fb.group(operationGroup);
  }

  ngOnInit() {
    console.log(this.operationType);
    switch (this.operationType) {
      case operationTypes['auth-presale']:
        this.service.getPreSale(this.business.id)
          .subscribe(res => {
            this.preSale = res;
            console.log(res); // TODO:
          });
        break;
      case operationTypes['project-filing']:
        this.contractTypeEnum = this.service.enumValueOf('contract'); // 签约方式
        break;
      case operationTypes['upload-meetingMinutes']:
        this.statusEnum = this.service.enumValueOf('status'); // 签约方式
        break;
      default:
        break;
    }
  }

  onSubmit(v: {[key: string]: string}) {
    let val: any = {...v};
    const cb = res => {
      this.message.success(this.translateService.translateKey('form.succeed'));
      this.modal.close('closed');
    };
    switch (this.operationType) {
      case operationTypes['auth-presale']:
        this.service.AuthPreSale(this.business.id, val.userId).subscribe(cb);
        break;
      case operationTypes['project-filing']:
        val = {
          ...val,
          businessId: this.business.id,
          projectName: this.business.name,
          stage: this.business.stage,
          entryTime: this.business.createTime
        };
        this.service.filing(val).subscribe(cb);
        break;
      case operationTypes['upload-record']:
        this.service.uploadVisitRecord(this.business.id, val).subscribe(cb);
        break;
      case operationTypes['upload-meetingMinutes']:
        this.service.uploadMeetingMinutes(this.business.id, val).subscribe(cb);
        break;
      default:
        break;
    }
  }

  uploadDemandFiles() {
    console.log('uploadDemandFiles');
  }

  uploadTestcaseFiles() {
    console.log('uploadTestcaseFiles');
  }

}
