import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { TuiModalService, TuiMessageService } from 'tdc-ui';
import { TranslateService } from '../../../i18n';

import { BusinessesService } from '../businesses.service';
import { BusinessDetails, BusinessFilter, statusEnum, Rival, operations, progressTypes } from '../businesses.model';

@Component({
  selector: 'erp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  id: number;
  business: BusinessDetails = new BusinessDetails();
  showNoFinished = true;
  breadCrumbs: any;
  status: any;  // is available or not
  filter: BusinessFilter = new BusinessFilter();
  rivalList: Rival[];
  operations: any[];
  dropdownDirection = 'bottomCenter';
  progressTypes: object = progressTypes;

  constructor(
    private modalService: TuiModalService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private message: TuiMessageService,
    private service: BusinessesService
  ) {
    this.operations = operations;
    // TODO: the condition of operations avariable.
  }

  ngOnInit() {
    const promises = [
      this.route.params,
      this.route.queryParams,
    ];
    combineLatest(promises)
      .subscribe(([pathParams, queryParams]) => {
        this.id = pathParams['id'];
        // TODO: only one time
        if (!!this.id) {
          this.fetchBusinessDetails();
          // this.fetchCustomerContacts();
          // this.fetchCustomerInvoices();
        } else {
          this.message.warning('no business details found'); // TODO:i18n
        }
      }
    );
  }

  swithStatus($event) {
    this.filter.open = !this.filter.open ;
    this.fetchBusinessDetails();
  }

  fetchBusinessDetails() {
    this.service.getTheBusiness(this.id).subscribe(res => {
      this.business = res;
      this.status = (res.status === statusEnum['normal'] || res.status === statusEnum['review']);
      this.rivalList = res.rivalList;

      // TODO: get the available operation types
      setTimeout(_ => {
        this.showNoFinished = false;
      }, 3000);

      this.breadCrumbs = [
        {
          ...this.service.getBusinessRootRoute()
        },
        {
          text: this.business.name,
          href: `/businesses/details/${this.id}?status=${this.status}`
        }
      ];
    });
  }

  edit() {
  }

  addRival() {

  }

  operation(type) {
    console.log(type);

  }

  toProgresses(type) {
    const business = {...this.business};

    this.router.navigate([`/businesses/progress/${this.id}` ], { queryParams: {
      name: business.name || 'test',  // TODO: remove
      type: type,
      status: this.status
    } });

  }

}
