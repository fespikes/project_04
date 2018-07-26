import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '../../i18n';

import { Customer, CustomerFilter } from './customers.model';

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
    return this.api.get(`customers`, filter);
  }

  getTheCustomer(id: number): Observable<any> {
    return this.api.get(`customers/${id}`);
  }

  updateCustomerStatus(customer: Customer) {
    const id = customer.id;
    return this.api.put(`customer/${id}/status`, { customer: customer});
  }

  cancel(customer: Customer) {
    return this.updateCustomerStatus(customer);
    // TODO:
  }

  reactivate(customer: Customer) {
    return this.updateCustomerStatus(customer);
    // TODO:
  }

  createCustomer(customer: Customer) {
    return this.api.post('/customer', {customer: customer});
  }


}
