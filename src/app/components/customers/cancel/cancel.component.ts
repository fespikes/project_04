import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TuiModalRef } from 'tdc-ui';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'erp-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.sass']
})
export class CancelComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private modal: TuiModalRef,
    private customersService: CustomersService,
  ) {
    this.myForm = fb.group({
      'username': ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
