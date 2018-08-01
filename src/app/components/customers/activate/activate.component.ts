import { Component, OnInit, Inject } from '@angular/core';

import { TranslateService } from 'src/app/i18n';
import { TuiModalRef, TuiMessageService, TUI_MODAL_DATA } from 'tdc-ui';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'erp-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.sass']
})
export class ActivateComponent {
  customer: any = {};
  tipMessage: string;

  constructor(
    @Inject(TUI_MODAL_DATA) data,
    private modal: TuiModalRef,
    private service: CustomersService,
    private message: TuiMessageService,
    private translateService: TranslateService
  ) {
    this.customer = data.customer;
    this.tipMessage = `确定重新启用${this.customer.name || ''}吗？`;
  }

  submit(value: {[s: string]: string}) {
    const val: any = {...value};

    this.service.reactivate(this.customer)
      .subscribe(res => {
        this.message.success(this.translateService.translateKey('form.succeed'));
        this.modal.close('closed');
      });
  }

  exit() {
    this.modal.close('closed');
  }

}
