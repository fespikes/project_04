import { Business } from '../businesses/businesses.model';
import { Contact } from '../../shared';
import { Validators } from '@angular/forms';

export enum editTypes {
  basic = 'basic',
  status = 'status',
  invoice = 'invoice',
  contact = 'contact',
  taker = 'taker',
  others = 'others'
}

// export const customerStatus =

export class Customer {
  abbreviation: string; // 公司简称 ,
  bank?: string; // 开户行 ,
  bankAccount?: string; // 银行账号 ,
  businessLicense ?: string; // 营业执照号 ,
  branchOffice ?: string; // 分公司名称 ,
  businesses?: Business[];
  category?: 'OPPORTUNITY' | 'COOPERATION'; // 客户类别
  city?: string; // 城市 ,
  cityLeve?: string; // 城市级别 ,
  comment?: string; // 备注 ,
  contacts?: Contact[];
  country?: string; // 国别 ,
  createTime ?: string; // 创建日期 ,
  creator?: string; // 创建人 ,
  id?: number; //
  industry?: string; // 所属行业
  invoice?: string; // 发票客户名称 ,
  lastContactTime?: string; // 最后联系日期 ,
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5'; // 客户级别
  modify?: string; // 上次修改人 ,
  modifyTime?: string; // 上次修改日期 ,
  name?: string; // 公司名称 ,
  newOrOld: 'NEW' | 'OLD'; //
  nextContactTime?: string; // 下次联系日期 ,
  parent?: string; // 母公司 ,
  profile?: string; // 公司简介 ,
  province?: string; // 省份 ,
  reason?: string; // 作废原因 ,
  registrationLocation?: string; // 注册地 ,
  registrationPhone?: string; // 注册电话 ,
  sales?: string; // 销售负责人 ,
  status?: 'NORMAL' |'INVALID'; //
  taxRegistration?: string; // 纳税登记号

  static getFormObj(type) {
    const editType = type || editTypes['basic'];
    let modelObj = {};
    switch (editType) {
      case editTypes['basic']:
        modelObj = {
          'companyName': ['', Validators.required],
          'companyAbbr': [''],
          'country': [        // TODO: options
            '', Validators.compose([
              Validators.required,
            ]),
          ],
          'city': [''],  // TODO: options
          'cityLeve': [''], // TODO: options
          'province': [''],
          'parentComp': [''],
          'companyProfile': [''],
        };
        break;
      case editTypes['status']:
        modelObj = {
          'category': ['', Validators.required],
          'level': ['', Validators.required],
          'customerStatus': [ // read only
            // TODO: to be determin
            '', Validators.compose([
              Validators.required,
            ]),
          ],
          'reason': ['']
        };
        break;
      case editTypes['invoice']:
        modelObj = {
          'invCustomerName': ['', Validators.required],
          'branchName': [''],
          'blNumber': [
            '', Validators.compose([
              Validators.required,
            ]),
          ],
          'taxReg': ['', Validators.required],
          'bankName': ['', Validators.required],
          'accountBank': ['', Validators.required],
          'regLocal': ['', Validators.required],
          'regPhone': ['', Validators.required]
        };
        break;
      case editTypes['contact']:
        modelObj = {
          'name': ['', Validators.required],
          'job': ['', Validators.required],
          'dep': [
            '', Validators.compose([
              Validators.required,
            ]),
          ],
          'landline': ['', Validators.required],
          'phone': [''],
          'email': [''],
          'fax': [''],
          'address': ['']
        };
        break;
      case editTypes['taker']:
        modelObj = {
          'name': ['', Validators.required],
          'phone': ['', Validators.required],
          'email': [''],
          'workingAddress': [''],
          'address': [''] // textarea
        };
        break;
      case editTypes['others']:
        modelObj = {
          'lastContactDate': [''],  // read only
          // TODO: to be determin
          'nextContactTime': ['', Validators.required],
          'comment': [''],  // textarea
        };
        break;

      default:
        break;
    }
    return modelObj;
  }

  static getModelTitle(type) {
    let title = '';
    switch (type) {
      case editTypes.basic:
        title = 'customers.basic';
        break;
      case editTypes.status:
        title = 'customers.status';
        break;
      case editTypes.invoice:
        title = 'customers.invoice';
        break;
      case editTypes.contact:
        title = 'customers.contact';
        break;
      case editTypes.taker:
        title = 'customers.taker';
        break;
      case editTypes.others:
        title = 'customers.others';
        break;
      default:
        console.log('no type exists');
        break;
    }
    return title;
  }

}

export class CustomerFilter {
  pageNum: number;
  pageSize: number;
  name?: string;
  mode?: string;
  status?: string; // 'NORMAL, INVALID'
}
