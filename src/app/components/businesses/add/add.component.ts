import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TranslateService } from 'src/app/i18n';
import { storageKeys } from 'src/app/shared';
import { TuiModalRef, TuiMessageService, TUI_MODAL_DATA, TuiModalService } from 'tdc-ui';
import { BusinessesService } from '../businesses.service';
import { editTypes, BusinessDetails } from '../businesses.model';
import {
  AddComponent as AddCustomerComponent,
} from '../../customers/add/add.component';

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
    private translateService: TranslateService,
    private modalService: TuiModalService,

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
    const customersKey = storageKeys.customers; // TODO: api realted changes
    const customersStored = localStorage.getItem(customersKey);

    this.contractTypes = this.service.enumValueOf('pre-signed-contract-type');

    const cb = () => {
      this.customers = JSON.parse(localStorage.getItem(customersKey));
    };

    if ( customersStored ) {
      this.customers = JSON.parse(customersStored);
    } else {
      this.service.fetchBusinessesEnums(cb);
    }
  }

  ngOnInit() {
  }

  createCustomer(size = 'lg') {
    return this.modalService.open(AddCustomerComponent, {
      title: this.translateService.translateKey('新增客户'),
      size
    }).subscribe((word: string) => {
        this.getEnums();
      });
  }

  onSubmit(v: {[s: string]: string}) {
    const val: any = {...v};
    // val.deletable = (value.deletable.indexOf('true') > -1 ? true : false);
    const succeed = ( ) => {
      this.message.success(this.translateService.translateKey('form.succeed'));
      this.modal.close('closed');
    };

    this.service.createBusiness(val)
      .subscribe(succeed);
  }

}
