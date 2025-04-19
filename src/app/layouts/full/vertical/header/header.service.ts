import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/app/environment/environment";
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";




@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    private url = environment.domain
    private socket: Socket;

    private dataFriendsDisplay = new BehaviorSubject<any | null>(null);
    public dataFriends$: Observable<any | null> =
        this.dataFriendsDisplay.asObservable();

    private dataEmailDisplay = new BehaviorSubject<any | null>(null);
    public dataEmail$: Observable<any | null> =
        this.dataEmailDisplay.asObservable();

    constructor(
        private httpClient: HttpClient, 
        private router: Router) 
    {
        this.socket = io(this.url,{
            auth:{
                email: localStorage.getItem('gmail')
            }
        });
    }

    getAIResponse(message: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const body = {
            message: message
        };
        const response = this.httpClient.post<any>(`${this.url}/auth/connect-ai`, body, { headers: headers });
        return response.pipe(
            map((res: any) => {
                console.log('res version', res);
                return res
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
    

    sendMessage(message: any) {
        this.socket.emit('friend-request', message);
    }

    onMessage(callback: (data: any) => void) {
        this.socket.on('friend-request', callback);
    }

    disconnect() {
        this.socket.disconnect();
    }

    socketSendMess(recipient_gmail: string, message: string){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const body = {
            recipient: recipient_gmail,
            message: `${localStorage.getItem('gmail')} ${message} `
        };
        const response = this.httpClient.post<any>(`${this.url}/auth/friends/request-socket`, body, { headers: headers });
        return response.pipe(
            map((res: any) => {
                console.log('res version', res);
                return res
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

    acceptFriend(recipient_gmail: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const body = {
            recipient: recipient_gmail
        };
        const response = this.httpClient.post<any>(`${this.url}/auth/friends/accept`, body, { headers: headers });
        return response.pipe(
            map((res: any) => {
                console.log('res version', res);
                return res
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

    cancelFriend(recipient_gmail: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const body = {
            recipient: recipient_gmail
        };
        const response = this.httpClient.post<any>(`${this.url}/auth/friends/reject`, body, { headers: headers });
        return response.pipe(
            map((res: any) => {
                console.log('res version', res);
                return res
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

    addFriend(email: string) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('tokens')}`
        });
      
        const body = {
            recipient: email
        }; // Nếu không cần gửi gì trong body, để rỗng
      
        return this.httpClient.post<any>(`${this.url}/auth/friends/request`, body, { headers }).pipe(
          map((res: any) => {
            console.log('res version', res);
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
        );
      }

    getEmail() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const response = this.httpClient.get<any>(`${this.url}/auth/all-email`, { headers: headers });
        return response.pipe(
            tap((res: any) => {
                console.log('res version', res);
                this.dataEmailDisplay.next(res);
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

    getDataFriendsNotAccepted() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('tokens')}`
        });
        const response = this.httpClient.get<any>(`${this.url}/auth/friends/not-accepted`, { headers: headers });
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