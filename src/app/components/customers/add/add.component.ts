import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TranslateService } from 'src/app/i18n';
import { TuiModalRef, TuiMessageService, TUI_MODAL_DATA } from 'tdc-ui';
import { CustomersService } from '../customers.service';
import { editTypes, Customer } from '../customers.model';

@Component({
  selector: 'erp-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  myForm: FormGroup;
  customerLevels: any[] = [];
  customerCategories: any[] = [];
  customerId: any;  // only get from data when adding: contact, taker.
  editType: any = false;
  editTypes = editTypes;

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    fb: FormBuilder,
    private modal: TuiModalRef,
    private service: CustomersService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {
    this.customerId = data.id;
    if (data.editType ) {
      this.editType = data.editType;
      this.myForm = fb.group(Customer.getAddControlGroup(data.editType));
    } else {
      this.editType = '';
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

  }

  ngOnInit() {
    const enums = this.service.getCustomerEnums();
    this.customerLevels = JSON.parse(enums.levels);
    this.customerCategories = JSON.parse(enums.categorys);
  }

  onSubmit(value: {[s: string]: string}) {
    const val: any = {...value};
    // val.deletable = (value.deletable.indexOf('true') > -1 ? true : false);
    const succeed = ( ) => {
      this.message.success(this.translateService.translateKey('form.succeed'));
      this.modal.close('closed');
    };

    if (this.editType === '') {
      this.service.createCustomer(val)
        .subscribe(succeed);
    } else if (this.editType === editTypes['contact']) {
      this.service.addCustomerContact(this.customerId, val)
        .subscribe(succeed);
    } else if (this.editType === editTypes['taker']) {
      this.service.addCustomerTaker(this.customerId, val)
        .subscribe(succeed);
    }
  }

}
