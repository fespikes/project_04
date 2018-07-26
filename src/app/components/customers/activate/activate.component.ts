import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiModalRef } from 'tdc-ui';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'erp-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.sass']
})
export class ActivateComponent implements OnInit {
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
