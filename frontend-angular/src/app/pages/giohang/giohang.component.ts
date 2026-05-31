import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GiohangService } from '../../services/giohang.service';
import { SanPham } from '../../models/sanpham';

@Component({
  selector: 'app-giohang',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <section id="trang-gio-hang" class="khung trang-gio-hang">
    <h1 class="tieu-de-trang">Giỏ hàng</h1>

    <div *ngIf="dsGioHang.length > 0; else gioRong" class="bo-cuc-gio-hang">
      <div class="danh-sach-gio-hang">
        <div *ngFor="let sp of dsGioHang" class="dong-gio-hang">
          <img [src]="sp.hinh" class="anh-gio-hang">

          <div class="noi-dung-gio-hang">
            <div>
              <h3 class="ten-gio-hang">{{sp.ten}}</h3>
              <p class="gia-gio-hang">{{sp.gia | number}} d</p>
            </div>

            <button (click)="xoa(sp.id)" class="nut-vien nut-xoa">Xóa</button>
          </div>
        </div>
      </div>

      <aside class="tom-tat-gio-hang">
        <h2>Tạm tính</h2>
        <p class="so-luong-gio-hang">So san pham: {{dsGioHang.length}}</p>
        <p class="tong-tien-gio-hang">{{tongTien | number}} d</p>
        <button class="nut-do nut-thanh-toan">Thanh toán</button>
      </aside>
    </div>

    <ng-template #gioRong>
      <div class="gio-hang-rong">
        <p>Gio hang dang trong.</p>
        <a routerLink="/san-pham" class="nut-do nut-mua-san-pham">Mua sản phẩm</a>
      </div>
    </ng-template>
  </section>`
})
export class GiohangComponent {
  dsGioHang: SanPham[] = [];
  tongTien = 0;

  constructor(private giohang: GiohangService) {
    this.giohang.danhSach$.subscribe(ds => {
      this.dsGioHang = ds;
      this.tongTien = this.giohang.tongTien();
    });
  }

  xoa(id: number) {
    this.giohang.xoa(id);
  }
}
