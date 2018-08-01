import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TranslateService } from 'src/app/i18n';
import { TuiModalRef, TuiMessageService, TUI_MODAL_DATA } from 'tdc-ui';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'erp-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.sass']
})
export class CancelComponent {
  myForm: FormGroup;
  customer: any;

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    fb: FormBuilder,
    private modal: TuiModalRef,
    private service: CustomersService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {
    this.customer = data.customer;
    this.myForm = fb.group({
      'reason': ['', Validators.required],
    });
  }

  onSubmit(value: {[s: string]: string}) {
    const val: any = {...value};
    this.service.cancel(this.customer, val)
      .subscribe(res => {
        this.message.success(this.translateService.translateKey('form.succeed'));
        this.modal.close('closed');
      });
  }
}
