import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumMap } from '../';
import { ErpApiService } from './api.service';

@Injectable()
export class ReqService {

  constructor(private api: ErpApiService) {}

  /**
   * 获取一个大类下的所有枚举值
   * @param type 目前可选值为 customer 和 business
   */
  enumOfType(type: string): Observable<EnumMap> {
    return this.api.get('enum/all', { type: type });
  }

}
