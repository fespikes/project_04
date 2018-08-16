import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { TuiModalService, TuiMessageService } from 'tdc-ui';
import { TranslateService } from '../../../i18n';

import { BusinessesService } from '../businesses.service';
import { BusinessDetails, BusinessFilter } from '../businesses.model';

@Component({
  selector: 'erp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  id: number;
  business: BusinessDetails = new BusinessDetails();
  breadCrumbs: any;
  status: any;
  filter: BusinessFilter = new BusinessFilter();

  constructor(
    private modalService: TuiModalService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private message: TuiMessageService,
    private service: BusinessesService
  ) { }

  ngOnInit() {
    const promises = [
      this.route.params,
      this.route.queryParams,
    ];
    combineLatest(promises)
      .subscribe(([pathParams, queryParams]) => {
        console.log('.... you ');
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
    if (this.filter.status !== 'INVALID') {
      this.filter.status = 'INVALID';
    } else {
      this.filter.status = 'NORMAL';
    }
    this.fetchBusinessDetails();
  }

  fetchBusinessDetails() {
    this.service.getTheBusiness(this.id).subscribe(res => {
      this.business = res;

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

}
