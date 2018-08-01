import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { TuiModalService, TuiMessageService } from 'tdc-ui';
import { TranslateService } from '../../../i18n';

import { CustomersService } from '../customers.service';
import { EditComponent } from '../edit/edit.component';
import { editTypes, Customer, Invoice } from '../customers.model';
import { Contact } from '../../../shared';

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

  constructor(
    private modalService: TuiModalService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
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
      this.contacts = res.result;
    });
  }

  edit(type, size = 'lg') {
    const titleKey = Customer.getModelTitle(type);
    return this.modalService.open(EditComponent, {
      title: this.translateService.translateKey(titleKey),
      size,
      data: {
        editType: type,
        customer: this.customer,
        id: this.customer.id
      },
    })
      .subscribe((word: string) => {
        this.fetchCustomerDetails();
      });
  }

  addContact() {
    // TODO:

  }

}
