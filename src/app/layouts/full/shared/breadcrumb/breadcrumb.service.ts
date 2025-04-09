import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/app/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    private url = environment.domain
    constructor(
        private httpClient: HttpClient, 
        private router: Router) 
    {
       
    }

    private dataFriendsDisplay = new BehaviorSubject<any | null>(null);
        public dataFriends$: Observable<any | null> =
            this.dataFriendsDisplay.asObservable();





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
}