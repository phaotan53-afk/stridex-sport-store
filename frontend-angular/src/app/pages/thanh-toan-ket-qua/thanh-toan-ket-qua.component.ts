import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GiohangService } from '../../services/giohang.service';

@Component({
  selector: 'app-thanh-toan-ket-qua',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './thanh-toan-ket-qua.component.html',
  styleUrls: ['./thanh-toan-ket-qua.component.css']
})
export class ThanhToanKetQuaComponent {
  maDonHang = '';
  maLoi = '';
  thanhCong = false;

  constructor(
    private route: ActivatedRoute,
    private giohang: GiohangService
  ) {
    this.route.queryParams.subscribe(params => {
      this.maDonHang = params['maDonHang'] || '';
      this.maLoi = params['maLoi'] || '';
      this.thanhCong = params['trangThai'] === 'success';

      if (this.thanhCong) {
        this.giohang.xoaTatCa();
      }
    });
  }
}