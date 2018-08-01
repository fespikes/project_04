import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TranslateService } from 'src/app/i18n';
import { TuiModalRef, TuiMessageService } from 'tdc-ui';
import { CustomersService } from '../customers.service';
import { storageKeys } from 'src/app/shared';

@Component({
  selector: 'erp-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  myForm: FormGroup;
  customerLevels: any[] = [];
  customerCategories: any[] = [];

  constructor(
    fb: FormBuilder,
    private modal: TuiModalRef,
    private service: CustomersService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {
    this.myForm = fb.group({
      'name': ['', Validators.required],
      'abbreviation': ['', Validators.required],
      'level': [this.customerLevels[0], Validators.required],
      'category': [
        this.customerCategories[0],
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit() {
    const enums = this.service.getCustomerEnums();
    this.customerLevels = JSON.parse(enums.levels);
    this.customerCategories = JSON.parse(enums.categorys);
  }

  onSubmit(value: {[s: string]: string}) {
    const val: any = {...value};
    // val.deletable = (value.deletable.indexOf('true') > -1 ? true : false);

    this.service.createCustomer(val)
      .subscribe(res => {
        this.message.success(this.translateService.translateKey('form.succeed'));
        this.modal.close('closed');
      });
  }

}
