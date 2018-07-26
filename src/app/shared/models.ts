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
  customer?: Customer;
  customerId?: number; // 客户编号,
  department?: string; // 联系人部门,
  email?: string; // 联系人邮箱,
  id?: number; //
  landline?: string; // 联系人电话,
  name?: string; // 联系人姓名,
  phone?: string; // 联系人手机
  post?: string; // 联系人职务
}
