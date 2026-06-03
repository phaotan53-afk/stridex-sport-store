import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dangnhap',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section id="trang-dang-nhap" class="khung trang-dang-nhap">
    <form [formGroup]="formDangNhap" (ngSubmit)="dangNhap()" class="form-dang-nhap">
      <p class="chu-chao-mung">WELCOME BACK</p>
      <h1 class="tieu-de-dang-nhap">Dang nhap</h1>

      <label class="nhom-o-nhap">
        <span>Email</span>
        <input id="email" formControlName="email" class="o-nhap">
      </label>

      <label class="nhom-o-nhap">
        <span>Mật Khẩu</span>
        <input id="mat-khau" type="password" formControlName="matKhau" class="o-nhap">
      </label>

      <p *ngIf="formDangNhap.invalid && daBam" class="thong-bao-loi">
        Vui Lòng nhập đúng email và mật khẩu.
      </p>

      <button class="nut-do nut-dang-nhap-day-du" type="submit">Đăng nhập</button>
    </form>
  </section>`
})
export class DangnhapComponent {
  daBam = false;

  formDangNhap = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    matKhau: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  dangNhap() {
    this.daBam = true;

    if (this.formDangNhap.invalid) {
      return;
    }

    const email = this.formDangNhap.value.email ?? '';
    const matKhau = this.formDangNhap.value.matKhau ?? '';

    const thanhCong = this.auth.dangNhap(email, matKhau);

    if (thanhCong) {
      alert('Đăng nhập admin thành công!');
      this.router.navigate(['/admin']);
    } else {
      alert('Sai tài khoản hoặc mật khẩu!');
    }
  }
}
