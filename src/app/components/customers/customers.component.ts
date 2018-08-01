import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TuiModalService, Pagination } from 'tdc-ui';
import { TranslateService } from '../../i18n';

import { CustomersService } from './customers.service';
import { AddComponent } from './add/add.component';
import { CancelComponent } from './cancel/cancel.component';
import { ActivateComponent } from './activate/activate.component';
import { Customer, CustomerFilter } from './customers.model';

@Component({
  selector: 'erp-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit {
  pagination: Pagination = new Pagination();
  filter = new CustomerFilter();
  list: Customer[];

  constructor(
    private modalService: TuiModalService,
    private router: Router,
    private service: CustomersService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.fetchData();
    this.service.fetchCustomerEnums();
  }

  fetchData() { // TODO: 需要在查看客户里面提供”是否作废“的字段
    this.filter.pageNum = this.pagination.page;
    this.filter.pageSize = this.pagination.size;

    this.service.getCustomers(this.filter)
      .subscribe((res) => {
        this.pagination = res.pagination;
        this.list = res.data;
      });
  }

  add(size = 'lg') {
    return this.modalService.open(AddComponent, {
      title: this.translateService.translateKey('新增客户'),
      size
    }).subscribe((word: string) => {
        this.fetchData();
      });
  }

  cancel(customer: Customer) {
    return this.modalService.open(CancelComponent, {
      title: this.translateService.translateKey('作废客户'),
      size: 'lg',
      data: {
        customer: customer
      }
    }).subscribe((word: string) => {
        this.fetchData();
      });
  }

  swithStatus($event) {
    if (this.filter.status !== 'INVALID') {
      this.filter.status = 'INVALID';
    } else {
      this.filter.status = 'NORMAL';
    }
    this.fetchData();
  }

  toDetails(item?) {
    console.log(item);
    // TODO: if canceled
    this.router.navigate([`/customers/details/${item.id}`], { queryParams: { status: item.status } });
  }

  reactivate(customer: Customer) {
    return this.modalService.open(ActivateComponent, {
      title: this.translateService.translateKey('重新启用'),
      size: 'lg',
      data: {
        customer: customer
      }
    }).subscribe((word: string) => {
      this.fetchData();
    });
  }

  createCustomer(customer: Customer) {
    return this.service.createCustomer(customer).subscribe((word: string) => {
      this.fetchData();
    });
  }
}
