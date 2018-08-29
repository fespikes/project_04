import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { BusinessesService } from '../businesses.service';
import { TuiModalService, TuiMessageService } from 'tdc-ui';
import { TranslateService } from '../../../i18n';
import { operations, progressTypes } from '../businesses.model';

@Component({
  selector: 'erp-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass']
})
export class ProgressComponent implements OnInit {
  id: any;
  breadCrumbs: any;
  type: string;
  dropdownDirection = 'bottomCenter';
  progressTypes = progressTypes;
  operations: any[];
  objectOptions = [
    // TODO: i18n
    // TODO: icon
    {
      label: '全部记录',
      icon: '',
      value: progressTypes['all']
    },
    {
      label: 'POC',
      icon: '',
      value: progressTypes['poc']
    },
    {
      label: '架构师',
      icon: '',
      value: progressTypes['architect']
    },
    {
      label: '拜访记录',
      icon: '',
      value: progressTypes['visits']
    },
    {
      label: '会议纪要',
      icon: '',
      value: progressTypes['records']
    }
  ];

//   this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  constructor(
    private modalService: TuiModalService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private message: TuiMessageService,
    private service: BusinessesService
  ) {
    this.operations = operations;
  }

  ngOnInit() {
    const promises = [
      this.route.params,
      this.route.queryParams,
    ];
    combineLatest(promises)
      .subscribe(([pathParams, queryParams]) => {
        this.id = pathParams['id'];
        this.type = queryParams['type'];

        if (!!this.id) {
          this.getProgressList();
        } else {
          this.message.warning('no details found'); // TODO:i18n
        }
        this.breadCrumbs = [
          {
            ...this.service.getBusinessRootRoute()
          },
          {
            text: queryParams['name'],
            href: `/businesses/details/${this.id}?status=${queryParams['type']}`
          },
          {
            text: '项目进度',
            href: ''
          }
        ];
      }
    );
  }

  getProgressList() {
    this.service.getProgressInformation(this.id, this.type)
      .subscribe(res => {

      });
  }

  putout(type) {
    console.log(type);

  }

}
