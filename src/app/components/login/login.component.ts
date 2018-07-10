import { Component, OnInit } from '@angular/core';
import { ErpApiService, ApiConfig } from '../../shared';

enum Status {
  Init = 'INIT',
  Process = 'PROCESS',
  Success = 'SUCCESS',
  Fail = 'FAIL'
}

@Component({
  selector: 'erp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  status: Status = Status.Init;

  constructor(private api: ErpApiService) { }

  ngOnInit() {
  }

  login(user: string, password: string): void {
    this.status = Status.Process;
    this.api.post(
      '/free-authentication/authentication',
      { name: user, password: password },
      { fullResponse: true })
      .subscribe(
        value => { this.status = Status.Success; },
        error => { this.status = Status.Fail; });

  }

  process() {
    return this.status === Status.Process;
  }

}
