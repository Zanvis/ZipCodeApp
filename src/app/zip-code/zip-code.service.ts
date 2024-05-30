import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  private cache: { [key: string]: any } = {};
  constructor(private http: HttpClient) {}

  getData(country: string, code: string): Observable<any> {
    const cacheKey = `${country}-${code}`;
    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]);
    }
    const url = `https://api.zippopotam.us/${country}/${code}`;
    return this.http.get(url).pipe(
      tap(data => {
        this.cache[cacheKey] = data;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
