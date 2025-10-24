import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path = this.url.path;
  accesToken: any;
  httpOptions: { headers: HttpHeaders; } | any;
  httpOptions2: { headers: HttpHeaders; } | any;

  private tokenKey = 'auth_token';
  private idUser = 'idUser';
  private idOwner = 'idOwner';
  private readonly userRoleKey = 'user_role';

  private currentUserSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private url: PathService) { }




   login(credentials: any): Observable<any> {
    return this.http.post(`${this.path}login`, credentials).pipe(
      tap((response: any) => {
        if (response.access_token) {
          // Guardar el token
          this.setToken(response.access_token);

          // Guardar los detalles del usuario en localStorage
          localStorage.setItem('user_email', response.user.email);
          localStorage.setItem('user_role', response.user.rol);
          localStorage.setItem('user_name', response.user.name);
        } else {
          console.error('No se recibió un token válido');
        }
      })
    );
  }
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  loginVerifiedPassword(phone: any, role: any, password: any): Observable<any> {
    this.accesToken = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + this.accesToken
      }),
    };

    var datoaEnviar = {
      "phone": phone,
      "role": role,
      "password": password
    }

    return this.http.post(this.path + "session-cliente/login-password", datoaEnviar, this.httpOptions)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }));
  }

  register(data: any): Observable<any> {
    return this.http.post(this.path + "register", data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(response => of(response)),
      catchError(err => throwError(err))
    );
  }

  updateUser(data:any): Observable<any> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token no disponible');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    var datoaEnviar = data;

    return this.http.put(`${this.path}user/update`,datoaEnviar, { headers });
  }

   getProfileRiver(id:any): Observable<any> {
    this.accesToken = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accesToken
      }), 
  };


    return this.http.get(`${this.path}rider/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }));
  }
  
}
