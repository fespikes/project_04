import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { TranslateService } from '../../i18n';

import { storageKeys } from 'src/app/shared';
import { Customer, CustomerFilter, editTypes } from './customers.model';

import {
  ErpApiService,
} from '../../shared';

@Injectable()
export class CustomersService {

  constructor(
    private api: ErpApiService,
    private translateService: TranslateService,
  ) { }

  getCustomers(filter: CustomerFilter): Observable<any> {
    return this.api.get(`customer`, filter);
  }

  /**
   * assume the enums are used after enum calls
   */
  fetchCustomerEnums(): any {
    const store = window.localStorage;
    const levelKey = storageKeys.customerLevel;
    const categoryKey = storageKeys.customerCategory;
    const cityKey = storageKeys.customerCity;
    const countryKey = storageKeys.customerCountry;

    this.api.get(`enum/customer/category`).subscribe(
      res => {
        store.setItem(categoryKey, JSON.stringify(res));
      },
      error => (console.log('error getting category enums'))
    );
    this.api.get(`enum/customer/level`).subscribe(
      res => {
        store.setItem(levelKey, JSON.stringify(res));
      },
      error => (console.log('error getting level enums'))
    );
    this.api.get(`enum/customer/country`).subscribe(
      res => {
        store.setItem(countryKey, JSON.stringify(res));
      },
      error => (console.log('error getting country enums'))
    );
    this.api.get(`enum/customer/city`).subscribe(
      res => {
        store.setItem(cityKey, JSON.stringify(res));
      },
      error => (console.log('error getting city enums'))
    );
  }

  getCustomerEnums() {
    const store = window.localStorage;
    const levelKey = storageKeys.customerLevel;
    const categoryKey = storageKeys.customerCategory;
    return {
      levels: store.getItem(levelKey),
      categorys: store.getItem(categoryKey)
    };
  }

  createCustomer(customer: Customer) {
    console.log(customer);
    return this.api.post('/customer', {customer: customer});
  }

  getTheCustomer(id: number): Observable<any> {
    return this.api.get(`customer/${id}`);
  }

  getCustomerContacts(customerId: any): Observable<any> {
    return this.api.get(`customer/${customerId}/contacts`);
  }

  addCustomerContact(customerId: any): Observable<any> {
    return this.api.get(`customer/${customerId}/contacts`);
  }

  getCustomerInvoice(customerId: any): Observable<any> {
    return this.api.get(`customer/${customerId}/invoice`);
  }

  updateCustomer(customer: Customer, editType: string, param?) {
    const id = customer.id;
    const url = !!editType ? `customer/${id}/${editType}` : `customer/${id}`;
    return this.api.put(url, { ...param});
  }

  cancel(customer: Customer, param) {
    return this.updateCustomer(customer, editTypes['voided'], param);
  }

  reactivate(customer: Customer) {
    return this.updateCustomer(customer, editTypes['reEnable']);
  }

  editCustomer(customer: Customer, editType: string) {
    const id = customer.id;
    const url = !!editType ? `customer/${id}/${editType}` : `customer/${id}`;
    return this.api.put(url, { ...customer});
  }

}
