import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { map } from "rxjs";
import { environment } from "src/app/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class FullService {
  private url = environment.domain
  constructor(private httpClient: HttpClient) {}

  private messageDisplay = new BehaviorSubject<any | null>(null);
  public message$: Observable<any | null> =
    this.messageDisplay.asObservable();

 

  sendMessage(message: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/auth/message/create`, message, { headers: headers });
    return response.pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error) => {
        console.log(error.statusText);
        return throwError(() => error);
      })
    )
  }

  getMessage() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
        const response = this.httpClient.get<any>(`${this.url}/auth/message/get-all`, { headers: headers });
    return response.pipe(
      tap((res: any) => {
        this.messageDisplay.next(res);
      }),
      catchError((error) => {
        console.log(error.statusText);
        return throwError(() => error);
      })
    )
  }
  
  
}

