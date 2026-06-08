import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GiohangService } from '../../services/giohang.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-thanh-dieu-huong',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './thanh-dieu-huong.component.html'
})
export class ThanhDieuHuongComponent {
  soLuong = 0;
  hienDanhMuc = false;
  tuKhoa = '';

  constructor(
    private giohang: GiohangService,
    public auth: AuthService,
    private router: Router
  ) {
    this.giohang.danhSach$.subscribe(ds => this.soLuong = ds.length);
  }

  batTatDanhMuc() {
    this.hienDanhMuc = !this.hienDanhMuc;
  }

  dongDanhMuc() {
    this.hienDanhMuc = false;
  }

  timKiem() {
    if (this.tuKhoa.trim() !== '') {
      this.router.navigate(['/san-pham'], {
        queryParams: {
          q: this.tuKhoa
        }
      });

      this.tuKhoa = '';
      this.dongDanhMuc();
    }
  }
}