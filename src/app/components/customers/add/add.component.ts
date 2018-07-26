import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TuiModalRef } from 'tdc-ui';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'erp-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private modal: TuiModalRef,
    private customersService: CustomersService,
  ) {
    this.myForm = fb.group({
      'username': ['', Validators.required],
      'fullName': ['', Validators.required],
      'email': [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      'deletable': ['true', Validators.required],
    });
  }


  ngOnInit() {
  }

}
