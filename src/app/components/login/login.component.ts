import { Component, OnInit } from '@angular/core';
import { ErpApiService } from '../../shared';
import { Router } from '@angular/router';

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

  constructor(private api: ErpApiService, private router: Router) { }

  ngOnInit() {
  }

  login(user: string, password: string): void {
    this.status = Status.Process;
    this.api.post(
      '/free-authentication/authentication',
      { name: user, password: password },
      { fullResponse: true })
      .subscribe(
        () => {
          this.status = Status.Success;
          this.router.navigate(['/']);
        },
        () => { this.status = Status.Fail; });

  }

  process() {
    return this.status === Status.Process;
  }

}
