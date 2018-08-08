import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { PartialCollection } from '../models';

@Injectable()
export class ErpApiService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    // TODO: make the service name
    this.handleError = httpErrorHandler.createHandleError('');
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    });
    // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
  }

  private set headers(param) {
    this.headers = param;
  }

  private get httpOptions(): any {
    return {
      headers: this.headers
    };
  }

  getParams(p, all?: boolean) {
    const obj: any = {
      params: new HttpParams()
    };
    if (p) {
      for (const key in p) {
        if (p.hasOwnProperty(key)) {
          const element = p[key];
          obj.params = obj.params.set(key, element);
        } else {
          continue;
        }
      }
    }
    if (!!all) {
      obj.observe = 'response';
    }
    return obj;
  }

  makeUrl(url) {
    return location.origin + environment.apiUrl + '/' + url;
  }

  get(url: string, params?: any): Observable<any> {
    // const options = params && params.status ? { params: new HttpParams().set('status', params.status).set('fuck', '4') } : {};
    const options = this.getParams(params);
    return this.http.get(this.makeUrl(url), options)
      .pipe(
        // retry(3),
        catchError(this.handleError<any>('searchHeroes', []))
      );
  }

  getAll(url: string, params: Object = {}): Observable<PartialCollection> {
    params['size'] = Math.pow(2, 31) - 1;
    params['page'] = 1;
    return this.http.get(this.makeUrl(url), this.getParams(params, true))
      .pipe(
        // retry(3),
        catchError(this.handleError<any>('searchHeroes', []))
      );
  }

  put(url: string, body: Object = {}): Observable<any> {
    // this.headers = this.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put(
      this.makeUrl(url),
      JSON.stringify(body),
      this.httpOptions,
    ).pipe(
      catchError(this.handleError<any>('put', []))
    );
  }

  post(url: string, body: Object = {}, observe?: boolean): Observable<any> {
    const httpOptions = this.httpOptions;
    if (observe) {
      httpOptions.observe = 'response';
    }

    return this.http.post(
      this.makeUrl(url),
      JSON.stringify(body),
      this.httpOptions,
    ).pipe(
      catchError(this.handleError<any>('put', []))
    );
  }

  delete(url): Observable<any> {
    return this.http.delete(
      this.makeUrl(url),
      this.httpOptions,
    ).pipe(
      catchError(this.handleError<any>('put', []))
    );
  }
}
