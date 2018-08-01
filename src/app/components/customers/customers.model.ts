import { Business } from '../businesses/businesses.model';
import { Contact } from '../../shared';
import { Validators } from '@angular/forms';

export enum editTypes {
  basic = 'basic',
  status = 'status',
  invoice = 'invoice',  // 收票人
  contact = 'contact',  // 客户联系人信息
  taker = 'taker',
  other = 'other',
  reEnable = 're-enable',
  voided = 'voided'
}

export class Invoice {
  address?; // 收票人地址 ,
  customerId?; // (integer, optional): 客户编号 ,
  email?; // 收票人邮箱 ,
  id?; // (integer, optional): id ,
  name?; // 收票人姓名 ,
  phone?; // 收票人电话 ,
  workingAddress?; // 收票人单位
}

export class Customer {
  abbreviation: string; // 公司简称
  bank?: string; // 开户行
  bankAccount?: string; // 银行账号
  branchOffice ?: string; // 分公司名称
  businessLicense ?: string; // 营业执照号
  businesses?: Business[];
  category?: 'OPPORTUNITY' | 'COOPERATION'; // 客户类别
  city?: string; // 城市  api:enum
  cityLevel?: string; // 城市级别
  comment?: string; // 备注
  contacts?: Contact[]; // 客户联系人信
  country?: string; // 国别 api:enum
  createTime ?: string; // 创建日期
  creator?: string; // 创建人
  id?: number; //
  industry?: string; // 所属行业
  invoice?: string; // 发票客户名称
  invoices?: Invoice[]; // Array[CustomerInvoice] 客户收票人信息
  lastContactTime?: string; // 最后联系日期
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5'; // 客户级别
  // L1(一级客户),L2(二级客户),L3(三级客户),L4(四级客户),L5(五级客户)
  modify?: string; // 上次修改人
  modifyTime?: string; // 上次修改日期
  name?: string; // 公司名称
  newOrOld: 'NEW' | 'OLD'; //
  nextContactTime?: string; // 下次联系日期
  parent?: string; // 母公司
  profile?: string; // 公司简介
  province?: string; // 省份
  reason?: string; // 作废原因
  registrationLocation?: string; // 注册地
  registrationPhone?: string; // 注册电话
  sales?: string; // 销售负责人
  status?: 'NORMAL' |'INVALID'; // 客户状态:NORMAL(正常),INVALID(作废)
  taxRegistration?: string; // 纳税登记号

  static getFormObj(type) {
    const editType = type || editTypes['basic'];
    let modelObj = {};
    switch (editType) {
      case editTypes['basic']:
        modelObj = {
          'name': ['', Validators.required],
          'abbreviation': [''],
          'country': [        // TODO: options
            '', Validators.compose([
              Validators.required,
            ]),
          ],
          'city': [''],  // TODO: options
          'cityLevel': [''], // TODO: options
          'province': [''],
          'parent': [''],
          'profile': [''],
        };
        break;
      case editTypes['status']:
        modelObj = {
          'category': ['', Validators.required],
          'level': ['', Validators.required],
          'status': [ // read only
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
          'invoice': ['', Validators.required],
          'branchOffice': [''],
          'businessLicense': [
            '', Validators.compose([
              Validators.required,
            ]),
          ],
          'taxRegistration': ['', Validators.required],
          'bank': ['', Validators.required],
          'bankAccount': ['', Validators.required],
          'registrationLocation': ['', Validators.required],
          'registrationPhone': ['', Validators.required]
        };
        break;
      case editTypes['contact']:
        modelObj = {
          'name': ['', Validators.required],
          'post': ['', Validators.required],
          'department': [
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
      case editTypes['other']:
        modelObj = {
          'lastContactTime': [''],  // read only
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
      case editTypes.other:
        title = 'customers.other';
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
