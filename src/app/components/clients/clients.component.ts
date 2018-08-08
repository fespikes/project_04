import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TuiModalService, Pagination } from 'tdc-ui';
import { TranslateService } from '../../i18n';

import { ClientsService } from './clients.service';
import { Customer, CustomerFilter } from '../customers/customers.model';

@Component({
  selector: 'erp-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {
  pagination: Pagination = new Pagination();
  filter = new CustomerFilter();

  constructor() { }

  ngOnInit() {
  }

  fetchData() {
  }

  toDetails() {}

}
