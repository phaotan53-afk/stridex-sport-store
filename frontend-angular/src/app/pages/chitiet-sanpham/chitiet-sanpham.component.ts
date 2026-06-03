import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SanphamService } from '../../services/sanpham.service';
import { GiohangService } from '../../services/giohang.service';
import { SanPham } from '../../models/sanpham';

@Component({
  selector: 'app-chitiet-sanpham',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <section id="chi-tiet-san-pham" class="khung chi-tiet-san-pham" *ngIf="sanpham">
    <div class="khung-chi-tiet-san-pham">
      <img [src]="sanpham.hinh" class="anh-chi-tiet-san-pham">
      
      <div class="noi-dung-chi-tiet-san-pham">
        <p class="loai-chi-tiet-san-pham">{{sanpham.loai}}</p>
        <h1 class="ten-chi-tiet-san-pham">{{sanpham.ten}}</h1>
        <p class="mo-ta-chi-tiet-san-pham">{{sanpham.mota}}</p>
        <p class="gia-chi-tiet-san-pham">{{sanpham.gia | number}} d</p>

        <div class="nut-chi-tiet-san-pham">
          <button (click)="themGioHang()" class="nut-do">Thêm vào giỏ</button>
          <a routerLink="/san-pham" class="nut-vien">Quay lại</a>
        </div>
      </div>
    </div>
  </section>`
})
export class ChitietSanphamComponent {
  sanpham?: SanPham;

  constructor(
    route: ActivatedRoute,
    private sanphamService: SanphamService,
    private giohang: GiohangService
  ) {
    const id = Number(route.snapshot.paramMap.get('id'));
    this.sanphamService.layTheoId(id).subscribe(sp => this.sanpham = sp);
  }

  themGioHang() {
    if (this.sanpham) this.giohang.them(this.sanpham);
  }
}
