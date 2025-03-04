import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { environment } from "src/app/environment/environment";

@Injectable({
    providedIn: 'root'
  })
  export class SideRegisterService {
    private url = environment.domain
    constructor(public httpClient: HttpClient) {
    }
  
    public getRegister(data:any){      
      const response = this.httpClient.post<any>(`${environment.domain}/auth/create`,data);  
      return response.pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      )
      
  
      
    }
  }