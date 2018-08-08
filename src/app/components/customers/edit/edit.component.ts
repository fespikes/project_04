import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { TuiModalRef, TuiMessageService, TUI_MODAL_DATA } from 'tdc-ui';
import { TranslateService } from 'src/app/i18n';
import { editTypes, Customer } from '../customers.model';
import { Contact } from '../../../shared';

@Component({
  selector: 'erp-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  id: any;
  editTypes = editTypes;
  editType: string;
  myForm: FormGroup;
  instance: any;
  customer: Customer;
  minDate = new Date();   // in case of the data < today

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    fb: FormBuilder,
    private modal: TuiModalRef,
    private service: CustomersService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {
    this.id = data.id;  // customerId
    this.editType = data.editType;
    this.customer = data.customer;
    this.instance = data.obj || this.customer;

    const modelObj = (data.editType === editTypes.contact || data.editType === editTypes.invoice || data.editType === editTypes.taker) ?
      Customer.getEditFormObj(this.editType, data.obj) : Customer.getEditFormObj(this.editType, data.customer);
    this.myForm = fb.group(modelObj);
  }

  ngOnInit() {}

  onSubmit(value: {[s: string]: string}) {
    const val: any = {...value};

    if (this.instance) {
      // instance: invoice / contact / taker
      val.id = this.instance.id;
    }

    this.service.editCustomer(val, this.id, this.editType)
      .subscribe(res => {
        this.message.success(this.translateService.translateKey('form.succeed'));
        this.modal.close('closed');
      });
  }

}
