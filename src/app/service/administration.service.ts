import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
 path = this.url.path;
  accesToken: any;
  httpOptions: { headers: HttpHeaders; } | any;
  httpOptions2: { headers: HttpHeaders; } | any;
  private currentUserSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private url: PathService) { }



    getCampanias(id: any): Observable<any> {
    this.accesToken = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accesToken
      }),
    };


    return this.http.get(`${this.path}campanias/tipo-cliente/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }));
  }

     getCuponesAsignados(id: any): Observable<any> {
    this.accesToken = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accesToken
      }),
    };


    return this.http.get(`${this.path}cupones/cupones-usuario/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }));
  }

  getInfo(): Observable<any> {
    this.accesToken = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accesToken
      }),
    };


    return this.http.get(`${this.path}me`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }));
  }

    asignarCupon(body: any): Observable<any> {
    this.accesToken = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accesToken
      }),
    };


    return this.http.post(`${this.path}asignaciones`,body, this.httpOptions)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }));
  }

  reclamarPorCodigo(body: any): Observable<any> {
    this.accesToken = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accesToken
      }),
    };


    return this.http.post(`${this.path}asignaciones/cupon`,body, this.httpOptions)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }));
  }
    getCupones(id: any): Observable<any> {
    this.accesToken = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accesToken
      }),
    };


    return this.http.get(`${this.path}cupones/campania/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }));
  }

}


