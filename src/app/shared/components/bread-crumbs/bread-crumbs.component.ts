import { Component, OnInit, Input } from '@angular/core';

const breadCrumbs = [
  {
    text: '写道行1',
    href: 'http://www.baidu.com/'	// TODO: the link href
  },
  {
    text: '写道行2',
    href: 'http://www.baidu.com/'
  }
];

@Component({
  selector: 'erp-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.sass']
})
export class BreadCrumbsComponent implements OnInit {

  @Input()
  data: any = [];

  constructor() {
    // <erp-bread-crumbs [data]="breadCrumbs"></erp-bread-crumbs>
  }

  ngOnInit() {
    console.log(this.data);
  }

}
