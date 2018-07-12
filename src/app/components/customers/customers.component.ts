import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { Pagination } from 'tdc-ui';

@Component({
  selector: 'erp-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit {
  pagination: Pagination = new Pagination();
  filter: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchDataApi(pagination?) {
    return of({
      data: [],
      pagination: {
        page: 1,
        size: 10,
        ...pagination,
        total: 205,
      },
    });
  }

  fetchData() {
    this.fetchDataApi(this.pagination)
      .subscribe((data) => {
        this.pagination = data.pagination;
      });
  }

  toDetails(item?) {
    console.log(item);
    const id = 'llllll'; // TODO: get the id from item
    // TODO: if canceled
    this.router.navigate([`/customers/details/${id}`], { queryParams: { canceled: true/* this.filter.canceled */ } });
  }

  remove(item?) {
    console.log(item);
  }
}
