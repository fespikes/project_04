import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '../../../i18n';

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
  userName: string;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = sessionStorage.getItem('erp:user');
    if (user === null) {
      this.router.navigate(['/login']);
    } else {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }
  }

}
