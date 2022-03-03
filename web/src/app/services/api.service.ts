import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://localhost:8080/api';

  constructor(
    private http : HttpClient
  ) { }

  getAutoPhoneNo(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl + '/auto')
      .pipe(retry(1), catchError(this.handleError));
  }

  savePhoneNo(no_hp: string, provider: string): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + '/contact', {no_hp, provider})
      .pipe(retry(1), catchError(this.handleError));
  }

  editPhoneNo(id: string, no_hp: string, provider: string): Observable<any> {
    return this.http
      .put<any>(this.apiUrl + '/contact', {id, no_hp, provider})
      .pipe(retry(1), catchError(this.handleError));
  }

  deletePhoneNo(id: string): Observable<any> {
    return this.http
      .delete<any>(this.apiUrl + '/contact?id='+id)
      .pipe(retry(1), catchError(this.handleError));
  }

  getOutputPhoneNo(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl + '/output')
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.error_msg}`);
    }
    // return an observable with a user-facing error message
    return throwError(() => {
      return "Something bad happened; please try again later.";
    });
  }
}
