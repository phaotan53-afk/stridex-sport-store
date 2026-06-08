import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SanphamService } from '../../services/sanpham.service';
import { SanPham } from '../../models/sanpham';
import { TheSanPhamComponent } from '../../components/the-san-pham/the-san-pham.component';

@Component({
  selector: 'app-sanpham',
  standalone: true,
  imports: [CommonModule, FormsModule, TheSanPhamComponent],
  template: `
  <section id="trang-san-pham" class="khung trang-san-pham">
    <div class="dau-trang-san-pham">
      <p>COLLECTION</p>
      <h1>Danh sách sản phẩm</h1>
    </div>

    <div class="bo-loc-san-pham">
      <input id="o-tim-kiem" [(ngModel)]="tuKhoa" placeholder="Tim san pham..." class="o-loc-san-pham">

      <select id="chon-loai" [(ngModel)]="loaiDangChon" class="o-loc-san-pham">
        <option value="Tat ca">Tat ca</option>
        <option value="Giay">Giay</option>
        <option value="Ao">Ao</option>
        <option value="Quan">Quan</option>
        <option value="Phu kien">Phu kien</option>
      </select>
    </div>

    <div *ngIf="danhSachLoc.length > 0; else khongCo" class="luoi-san-pham">
      <app-the-san-pham *ngFor="let sp of danhSachLoc" [sanpham]="sp"></app-the-san-pham>
    </div>

    <ng-template #khongCo>
      <p class="khong-co-san-pham">Không tìm thấy sản phẩm phù hợp.</p>
    </ng-template>
  </section>`
})
export class SanphamComponent {
  dsSanPham: SanPham[] = [];
  tuKhoa = '';
  loaiDangChon = 'Tat ca';

  constructor(
    private sanphamService: SanphamService,
    private route: ActivatedRoute
  ) {
    this.sanphamService.layTatCa().subscribe(ds => this.dsSanPham = ds);

    this.route.queryParams.subscribe(p => {
      this.tuKhoa = p['q'] || '';
    });
  }

  get danhSachLoc() {
    const tim = this.tuKhoa.toLowerCase();

    return this.dsSanPham.filter(sp =>
      (this.loaiDangChon === 'Tat ca' || sp.loai === this.loaiDangChon) &&
      (
        sp.ten.toLowerCase().includes(tim) ||
        sp.loai.toLowerCase().includes(tim) ||
        sp.mota.toLowerCase().includes(tim)
      )
    );
  }
}