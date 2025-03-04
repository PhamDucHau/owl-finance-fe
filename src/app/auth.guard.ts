import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Giả sử bạn có một phương thức kiểm tra trạng thái xác thực
   
    const token = localStorage.getItem('tokens');
    

    if (token) {
      // Thực hiện thêm kiểm tra về token nếu cần, ví dụ: kiểm tra tính hợp lệ của token
      return true;
    } else {
      // Nếu không có token, chuyển hướng đến trang đăng nhập
      this.router.navigate(['/authentication/login']);
      return false;
    }
  }
}