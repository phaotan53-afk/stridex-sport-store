import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dangNhap(email: string, matKhau: string): boolean {
    if (email === 'admin.com' && matKhau === '123456') {
      localStorage.setItem('adminDangNhap', 'true');
      return true;
    }

    return false;
  }

  daDangNhap(): boolean {
    return localStorage.getItem('adminDangNhap') === 'true';
  }

  dangXuat() {
    localStorage.removeItem('adminDangNhap');
  }
}