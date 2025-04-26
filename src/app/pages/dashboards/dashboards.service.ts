import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { environment } from "src/app/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {
  private url = environment.domain

  constructor(private httpClient: HttpClient, private router: Router) { }
  private dataCardsDisplay =
    new BehaviorSubject<any | null>(null);
  public dataCards$: Observable<any | null> =
    this.dataCardsDisplay.asObservable();

  
    private dataFriendsDisplay = new BehaviorSubject<any | null>(null);
        public dataFriends$: Observable<any | null> =
            this.dataFriendsDisplay.asObservable();
    
    private dataPlanDisplay = new BehaviorSubject<any | null>(null);
    public dataPlan$: Observable<any | null> =
        this.dataPlanDisplay.asObservable();

    deletePlan(id: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const response = this.httpClient.post<any>(`${this.url}/auth/plan/delete`, { id }, { headers: headers });
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

    createPlan(data: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const response = this.httpClient.post<any>(`${this.url}/auth/plan/create`, data, { headers: headers });
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

    getDataPlan() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const response = this.httpClient.get<any>(`${this.url}/auth/plan/get-all`, { headers: headers });
        return response.pipe(   
            tap((res: any) => {
                this.dataPlanDisplay.next(res);
            }),
            catchError((error) => {
                console.log(error.statusText);
                return throwError(() => error);
            })
        )
    }






    getDataFriendsAccepted() {
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('tokens')}`
            });
            const response = this.httpClient.get<any>(`${this.url}/auth/friends/accepted`, { headers: headers });
            return response.pipe(
                tap((res: any) => {
                    console.log('res version', res);
                    this.dataFriendsDisplay.next(res);
                }),
                catchError((error) => {
                    console.log(error.statusText);
                    if (error.statusText === 'Unauthorized') {
                        localStorage.clear();
                        this.router.navigate(['/authentication/login']);
                    }
                    return throwError(() => error);
                })
            )
        }

  


  // getUser() {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  //   });

  //   const response = this.httpClient.get<any>(`${this.url}/`, { headers: headers });

  //   return response.pipe(
  //     tap((res: any) => {
  //       console.log('oo', res);
  //       this.dataCardsDisplay.next(res.data_card);
  //     }),
  //     catchError((error) => {
  //       console.log(error.statusText);
  //       if (error.statusText === 'Unauthorized') {
  //         localStorage.clear();
  //         this.router.navigate(['/authentication/login']);
  //       }
  //       return throwError(() => error);
  //     })
  //   )
  // }
  getData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });

    const response = this.httpClient.get<any>(`${this.url}/auth`, { headers: headers });

    return response.pipe(
      tap((res: any) => {
        
        const data = res.data_card          
          .filter((item:any) => item.deleted === false);
        
        this.dataCardsDisplay.next(data);
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  getDataBank() {
    const response = this.httpClient.get<any>(`https://api.vietqr.io/v2/banks`);

    return response.pipe(
      map((res: any) => {

        return res;
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  createCard(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/auth/create-card`, data, { headers: headers });
    return response
  }

  createTransaction(data: any) {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/auth/create-transactions`, data, { headers: headers });
  
    return response
  }

  updateCard(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/auth/update-card`, data, { headers: headers });
    return response
  }

  deleteCard(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/auth/delete-card`, data, { headers: headers });
    return response
  }

  deleteTransaction(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    
    const response = this.httpClient.post<any>(`${this.url}/auth/delete-transaction`, data, { headers: headers });
    return response
  }

  updateTransaction(data: any) {    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/auth/update-transaction`, data, { headers: headers });
    return response
  }

  uploadImageTransaction(file: File) {
    const formData = new FormData();
    formData.append('file', file); // Thêm file vào FormData
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    
    const response = this.httpClient.post<any>(`${this.url}/auth/verify-upload`, formData, { headers: headers });
    return response
  }

  uploadFile(file: File): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<string>(`${this.url}/minio/file`, formData, { headers: headers });
  }
}