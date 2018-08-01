import { Customer } from '../components/customers/customers.model';

export interface Pagination {
  page: number;
  size: number;
  total: number;
}

export interface PartialCollection {
  data: any[];
  pagination: Pagination;
}

export class Contact {
  address?: string; // 联系人地址,
  customerId?: number; // 客户编号,
  department?: string; // 联系人部门,
  email?: string; // 联系人邮箱,
  fax?: string; // 联系人传真 ,
  id?: number; //
  landline?: string; // 联系人电话,
  name?: string; // 联系人姓名,
  phone?: string; // 联系人手机
  post?: string; // 联系人职务
}

export enum storageKeys {
  user = 'erp:user',
  customerCategory = 'erp:customer:category',
  customerLevel = 'erp:customer:level',
  customerCity = 'erp:customer:city',
  customerCountry = 'erp:customer:country'
}
