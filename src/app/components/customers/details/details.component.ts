import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { TuiModalService, TuiMessageService } from 'tdc-ui';
import { TranslateService } from '../../../i18n';

import { CustomersService } from '../customers.service';
import { EditComponent } from '../edit/edit.component';
import { editTypes, Customer, Invoice } from '../customers.model';
import { Contact } from '../../../shared';
import { CancelComponent } from '../cancel/cancel.component';
import { ActivateComponent } from '../activate/activate.component';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'erp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

  editTypes = editTypes;
  id: number;
  status: 'NORMAL' | 'INVALID'; // 客户状态
  customer = new Customer();
  contacts: Contact[] = [];
  invoices: Invoice[] = [];
  breadCrumbs: any;

  constructor(
    private modalService: TuiModalService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private message: TuiMessageService,
    private service: CustomersService
  ) { }

  ngOnInit() {
    const promises = [
      this.route.params,
      this.route.queryParams,
    ];
    combineLatest(promises)
      .subscribe(([pathParams, queryParams]) => {
        console.log('.... you ');
        this.id = pathParams['id'];
        this.status = queryParams['status'];
        // TODO: only one time
        if (!!this.id) {
          this.fetchCustomerDetails();
          // this.fetchCustomerContacts();
          // this.fetchCustomerInvoices();
        } else {
          this.message.warning('no ticket details found'); // TODO:i18n
        }
      }
    );
  }

  fetchCustomerDetails() {
    this.service.getTheCustomer(this.id).subscribe(res => {
      console.log(res);
      this.contacts = res.contacts;
      this.customer = res;
      this.invoices = res.invoices;

      this.breadCrumbs = [
        {
          ...this.service.getCustomerRootRoute()
        },
        {
          text: this.customer.name,
          href: `/customers/details/${this.id}?status=${this.status}`
        }
      ];
    });
  }

  fetchCustomerContacts() {
    this.service.getCustomerContacts(this.id).subscribe(res => {
      console.log(res);
      this.contacts = res.result;
    });
  }

  fetchCustomerInvoices() {
    this.service.getCustomerInvoice(this.id).subscribe(res => {
      console.log(res);
      this.invoices = res.result;
    });
  }

  edit(type, obj?: any, size = 'lg') {
    const titleKey = Customer.getModelTitle(type);
    return this.modalService.open(EditComponent, {
      title: this.translateService.translateKey(titleKey),
      size,
      data: {
        editType: type,
        customer: this.customer,
        id: this.customer.id,
        obj: obj
      },
    }).subscribe((word: string) => {
        this.fetchCustomerDetails();
      });
  }

  add(editType, size = 'lg') {
    const titleKey = editType === editTypes['contact'] ? '新增联系人' : '新增收票人';
    return this.modalService.open(AddComponent, {
      title: this.translateService.translateKey(titleKey),
      size,
      data: {
        editType: editType,
        id: this.customer.id
      }
    }).subscribe((word: string) => {
      this.fetchCustomerDetails();
    });
  }

  cancel() {
    return this.modalService.open(CancelComponent, {
      title: this.translateService.translateKey('作废客户'),
      size: 'lg',
      data: {
        customer: this.customer,
        callback: () => {
          this.router.navigate(['/customers']);
        }
      }
    }).subscribe((word: string) => {
      return false;
    });
  }

  reactivate() {
    return this.modalService.open(ActivateComponent, {
      title: this.translateService.translateKey('重新启用'),
      size: 'lg',
      data: {
        customer: this.customer,
        callback: () => {
          this.router.navigate(['/customers']);
        }
      }
    }).subscribe((word: string) => {

    });
  }
}
