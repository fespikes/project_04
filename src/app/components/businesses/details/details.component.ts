import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { TuiModalService, TuiMessageService } from 'tdc-ui';
import { TranslateService } from '../../../i18n';

import { BusinessesService } from '../businesses.service';
import { BusinessDetails, BusinessFilter,
  statusEnum, Rival,
  operations, progressTypes,
  operationTypes
} from '../businesses.model';
import { OperationComponent } from '../operation/operation.component';
import { BusinessesComponent } from '../businesses.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'erp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  id: number;
  business: BusinessDetails = new BusinessDetails();
  showNoFinished = false;
  breadCrumbs: any;
  status: any;  // is available or not
  filter: BusinessFilter = new BusinessFilter();
  rivalList: Rival[];
  operations: any[];
  dropdownDirection = 'bottomCenter';
  progressTypes: object = progressTypes;
  /**
   * intro: if lenght>0, forbidden the two options:
   * 申请架构师 ;
   * 申请POC.
   */
  unfinished: any[];

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
      this.unfinished = res.unfinished;
      this.flushUnfinished();

      // TODO: get the available operation types
      // this.showNoFinished = false;

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

  flushUnfinished() {
    this.showNoFinished = this.unfinished.length > 0;

    if (this.showNoFinished) {
      this.operations.forEach(item => {
        if (item.operationType === operationTypes['apply-architect'] ||
          item.operationType === operationTypes['apply-poc']
        ) {
          item.disabled = true;
        }
      });
    }
  }

  edit() {
  }

  addRival() {

  }

  operation(operation, size = 'lg') {
    if (operation.disabled) {
      return false;
    } // operationType

    let title;
    switch (operation.operationType) {
      case operationTypes['auth-presale']:
        title = this.translateService.translateKey('指派售前');
        break;
      case operationTypes['project-filing']:
        title = this.translateService.translateKey('项目报备');
        break;
      case operationTypes['apply-architect']:
        title = this.translateService.translateKey('申请架构师');
        break;
      case operationTypes['apply-poc']:
        title = this.translateService.translateKey('申请POC');
        break;
      case operationTypes['upload-record']:
        title = this.translateService.translateKey('上传拜访记录');
        break;
      case operationTypes['upload-meetingMinutes']:
        title = this.translateService.translateKey('上传会议纪要');
        break;
      case operationTypes['close-business']:
        title = this.translateService.translateKey('关闭商机');
        break;
      default:
      title = '';
        console.error('no title');
        break;
    }

    if (operationTypes['close-business'] === operation.operationType) {
      this.service.closeBusiness(this.business, EditComponent, true);
    } else {
      return this.modalService.open(OperationComponent, {
        title: title,
        size,
        data: {
          operationType: operation.operationType,
          business: this.business
        }
      }).subscribe((word: string) => {
          this.fetchBusinessDetails();
        });
    }
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
