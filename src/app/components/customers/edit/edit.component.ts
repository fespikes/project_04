import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomersService } from '../customers.service';
import { TuiModalService, TuiModalRef, TUI_MODAL_DATA } from 'tdc-ui';

import { editTypes, Customer } from '../customers.model';

@Component({
  selector: 'erp-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  editTypes = editTypes;
  editType: string;
  myForm: FormGroup;

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    fb: FormBuilder,
    private modal: TuiModalRef,
    private customersService: CustomersService,
  ) {
    this.editType = data.editType;
    const modelObj = Customer.getFormObj(this.editType);
    this.myForm = fb.group(modelObj);
  }

  ngOnInit() {
  }

  onSubmit() {}


}
