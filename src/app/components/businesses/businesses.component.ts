import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiModalService, Pagination } from 'tdc-ui';

import { BusinessesService } from './businesses.service';
import { TranslateService } from '../../i18n';
import { BusinessDetails, BusinessFilter } from './businesses.model';
import { AddComponent } from './add/add.component';
import { ActivateComponent } from './activate/activate.component';

@Component({
  selector: 'erp-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.sass']
})
export class BusinessesComponent implements OnInit {
  pagination: Pagination = new Pagination();
  filter: any = new BusinessFilter();
  list: Array<BusinessDetails> = [];

  constructor(
    private modalService: TuiModalService,
    private router: Router,
    private service: BusinessesService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.fetchData();
    this.service.fetchBusinessesEnums();
  }

  fetchData() {
    this.filter.pageNum = this.pagination.page;
    this.filter.pageSize = this.pagination.size;

    this.service.getBusinesses(this.filter)
      .subscribe((res) => {
        this.pagination = res.pagination;
        this.list = res.data;
      });
  }

  swithStatus() {
    // here need to have api "status" ready.
    this.filter.status = !this.filter.status;
    this.fetchData();
  }

  add(size = 'lg') {
    return this.modalService.open(AddComponent, {
      title: this.translateService.translateKey('新增商机'),
      size
    }).subscribe((word: string) => {
        this.fetchData();
      });
  }

  toDetails(item?) {
    this.router.navigate([`/businesses/details/${item.id}`], { queryParams: {} });
  }

  remove(item?) {
    console.log(item);
  }

  reactivate(business: BusinessDetails) {
    return this.modalService.open(ActivateComponent, {
      title: this.translateService.translateKey('重新启用'),
      size: 'lg',
      data: {
        customer: business
      }
    }).subscribe((word: string) => {
      this.fetchData();
    });
  }
}
