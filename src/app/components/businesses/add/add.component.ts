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
import { editTypes, BusinessDetails } from '../businesses.model';

import { CustomersComponent } from '../../customers/customers.component';
@Component({
  selector: 'erp-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  myForm: FormGroup;
  businessId: any;
  editType: any = false;
  editTypes = editTypes;
  contractTypes: any;
  customers: any;

  minDate = new Date();

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    fb: FormBuilder,
    private modal: TuiModalRef,
    private service: BusinessesService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {

    this.businessId = data.id;
    if (data.editType ) {
      this.editType = data.editType;
      // TODO:
      this.myForm = fb.group(BusinessDetails.getAddControlGroup(data.editType));
    } else {
      this.editType = '';
      this.myForm = fb.group({
        'name': ['', Validators.required],
        'customerId': ['', Validators.required],  // selector
        'contractTime': [ new Date, Validators.required],
        'preSignedContractType': [    // selector
          ''
        ],
        'contractAmount': [ ''],
        'todotodo': [ ''],
        'nextContactTime': [ ''],
        'successRate': [ '']
      });
    }

    this.getEnums();
  }

  getEnums() {
    const ContractTypesKey = storageKeys.businessesContractTypes;
    const customersKey = storageKeys.customers;
    const contractTypesStored = localStorage.getItem(ContractTypesKey);
    const customersStored = localStorage.getItem(customersKey);

    const cb = () => {
      this.contractTypes = JSON.parse(localStorage.getItem(ContractTypesKey));
      this.customers = JSON.parse(localStorage.getItem(customersKey));
    };

    if ( contractTypesStored && customersStored ) {
      this.contractTypes = JSON.parse(contractTypesStored);
      this.customers = JSON.parse(customersStored);
    } else {
      this.service.fetchBusinessesEnums(cb);
    }
  }

  ngOnInit() {
  }

  createCustomer() {
    console.log('TODO: create customer');
  }

  onSubmit() {

  }

}
