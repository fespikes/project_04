import { Component, OnInit, HostBinding } from '@angular/core';

import { TranslateService } from 'src/app/i18n';


@Component({
  selector: 'erp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.tui-layout-head') hostClass = true;
  navs = ['customers', 'clients', 'businesses', 'opportunities', 'todos'].map((nav) => {
    return {
      link: '/' + nav,
      name: `layout.${nav}`,
    };
  });
  todosAmount = 32;
  name = 'Admin';

  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

}
