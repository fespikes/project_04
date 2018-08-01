import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { TuiModalRef, TuiMessageService, TUI_MODAL_DATA } from 'tdc-ui';
import { TranslateService } from 'src/app/i18n';
import { editTypes, Customer } from '../customers.model';

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

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    fb: FormBuilder,
    private modal: TuiModalRef,
    private service: CustomersService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {
    this.id = data.id;
    this.editType = data.editType;
    const modelObj = Customer.getFormObj(this.editType);
    this.myForm = fb.group(modelObj);
  }

  ngOnInit() {}

  onSubmit(value: {[s: string]: string}) {
    const val: any = {...value};
    val.id = this.id;

    this.service.editCustomer(val, this.editType)
      .subscribe(res => {
        this.message.success(this.translateService.translateKey('form.succeed'));
        this.modal.close('closed');
      });
  }

}
