import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { TranslateService } from '../../i18n';

import { storageKeys } from 'src/app/shared';
import { BusinessFilter } from './businesses.model';

import {
  ErpApiService,
} from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class BusinessesService {

  constructor(
    private api: ErpApiService,
    private translateService: TranslateService
  ) { }

  getBusinesses(filter: BusinessFilter): Observable<any> {
    return this.api.get(`business`, filter);
  }

  getTheBusiness(id): Observable<any> {
    return this.api.get(`business/${id}`);
  }
  getBusinessRootRoute() {
    return {
      text: '我的商机',
      href: '/businesses'
    };
  }

  fetchBusinessesEnums(callback = function() {}): any {
    const store = window.localStorage;
    const ContractTypes = storageKeys.businessesContractTypes;
    const getCustomersKey = storageKeys.customers;

    this.api.get(`enum/business/pre-signed-contract-type`).subscribe(
      res => {  // 预签合同类型
        store.setItem(ContractTypes, JSON.stringify(res));
        callback();
      },
      error => (console.log('error getting category enums'))
    );

    this.getCustomers().subscribe(
      res => {
        store.setItem(getCustomersKey, JSON.stringify(res.data));
        callback();
      },
      error => (console.log('error getting category enums'))
    );
  }

  getCustomers(filter: any = {}): Observable<any> {
    return this.api.get(`customer`, filter);
  }

}
