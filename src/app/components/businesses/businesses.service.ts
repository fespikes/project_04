import { Injectable } from '@angular/core';
import { TuiModalService } from 'tdc-ui';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TranslateService } from '../../i18n';
import { ReqService } from 'src/app/shared/services';
import { storageKeys, EnumValue, EnumMap } from 'src/app/shared';
import { BusinessFilter, editTypes, BusinessDetails } from './businesses.model';

import {
  ErpApiService,
} from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class BusinessesService {

  constructor(
    private api: ErpApiService,
    private translateService: TranslateService,
    private reqService: ReqService,
    private modalService: TuiModalService,
  ) { }

  getBusinesses(filter: BusinessFilter): Observable<any> {
    return this.api.get(`business`, filter);
  }

  getTheBusiness(id): Observable<any> {
    return this.api.get(`business/${id}`);
  }

  createBusiness(business: BusinessDetails): Observable<any> {
    return this.api.post(`business`, business);
  }

  getBusinessRootRoute() {
    return {
      text: '我的商机',
      href: '/businesses'
    };
  }

  fetchBusinessesEnums(callback = function() {}): any {
    const store = window.localStorage;
    const getCustomersKey = storageKeys.customers;

    this.reqService.enumOfType('business').subscribe(res => {
      store.setItem(storageKeys.business, JSON.stringify(res));
    });

    this.getCustomers({allData: true}).subscribe( // TODO:
      res => {
        store.setItem(getCustomersKey, JSON.stringify(res.data));
        callback();
      },
      error => (console.log('error getting BusinessesEnums'))
    );
  }

  enumValueOf(name: string): any[] {
    if (!name) { return; }
    const business = JSON.parse(localStorage.getItem(storageKeys.business));
    return business[name] || '';
  }

  getCloseBusinessEnum() {
    return this.enumValueOf('status').filter(item => item.key !== 'NORMAL');
  }

  getCustomers(filter: any = {}): Observable<any> {
    return this.api.get(`customer`, filter);
  }

  editBusiness(instance: any, business, editType) {
    let url;
    /* if (editType === editTypes['reEnable']) {
      url = `business/${business.id}`; // suppose this is available
      return this.api.put(url, {...business});
    } else {
      url = `business/${business.id}/${editType}`;
      return this.api.put(url, {...instance});
    }
 */
    url = `business/${business.id}/${editType}`;
    return this.api.put(url, {...instance});
  }

  closeBusiness(business, comp, fromOperate?): Observable<any> {
    const size = 'lg';
    return this.modalService.open(comp, {
      title: this.translateService.translateKey('关闭商机'),
      size,
      data: {
        editType: editTypes['voided'],
        business: business,
        fromOperate: fromOperate ? true : false
      }
    });
  }

  getProgress(businessId, type?: string): Observable<any> {
    console.log('getProgressInformation:', businessId);
    return this.api.get(`business/${businessId}/process${type ? '/' + type : ''}`);
  }

  // 根据商机获取竞争对手
  getRivalsByBusinessId(businessId): Observable<any> {
    console.log('getRivalsByBusinessId:', businessId);
    return this.api.get(`business/${businessId}/rival`);
  }

  /**
   * S: project operations
   */
  getPreSale(businessId): Observable<any> {
    return this.api.get(`permission/pre-sale`);
    // return this.api.get(`business/${businessId}/pre-sale`);
  }
  AuthPreSale(businessId, userId): Observable<any> {
    return this.api.post(`business/${businessId}/pre-sale?userId=${userId}`);
  }
  // 项目报备
  filing(project): Observable<any> {
    console.log(project);
    return this.api.post(`business-project-filing`, {...project});
  }
  // apply for architect
  applyArchitect(form): Observable<any> {
    return this.api.post('business-architect-request', {...form});
  }

  // apply POC
  uploadFile(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.api.uploadSingle('file', formData);
  }
  applyPoc(form): Observable<any> {
    return this.api.post('business-poc', {...form});
  }

  // upload visit-record
  uploadVisitRecord(businessId, form): Observable<any> {
    return this.api.post(`business/${businessId}/visit-record`, {...form});
  }

  uploadMeetingMinutes(businessId, form): Observable<any> {
    return this.api.post(`business/${businessId}/meeting-record`, {...form});
  }

}
