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
import { editTypes, BusinessDetails, Rival } from '../businesses.model';

@Component({
  selector: 'erp-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  loading: any; // TODO
  myForm: FormGroup;
  business: BusinessDetails;
  editType: any = false;
  editTypes = editTypes;
  businessStatus: any[];
  rivals: Rival[];

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    fb: FormBuilder,
    private modal: TuiModalRef,
    private service: BusinessesService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {
    this.business = data.business;
    this.editType = data.editType;
    this.myForm = fb.group(BusinessDetails.getEditControlGroup(this.editType));
    this.businessStatus = data.fromOperate ?
      this.service.getCloseBusinessEnum() : this.service.enumValueOf('status');
  }

  ngOnInit() {
    this.service.getRivalsByBusinessId(this.business.id)
      .subscribe(res => {
        this.rivals = res;
      });
  }

  onSubmit(value: {[s: string]: string}) {
    const val: any = {...value};

    this.service.editBusiness(val, this.business, this.editType)
      .subscribe(res => {
        this.message.success(this.translateService.translateKey('form.succeed'));
        this.modal.close('closed');
      });
  }

}
