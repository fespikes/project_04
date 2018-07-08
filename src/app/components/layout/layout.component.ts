import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'erp-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  @HostBinding('class.tui-layout') hostClass = true;

  constructor() { }

  ngOnInit() {
  }

}
