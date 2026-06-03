import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SanPham } from '../../models/sanpham';
import { GiohangService } from '../../services/giohang.service';

@Component({
  selector: 'app-the-san-pham',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <article id="the-san-pham" class="the-san-pham">
    <a [routerLink]="['/san-pham', sanpham.id]" class="anh-san-pham-link">
      <img [src]="sanpham.hinh" [alt]="sanpham.ten" class="anh-san-pham">
    </a>

    <div class="noi-dung-the-san-pham">
      <div class="dong-thong-tin-san-pham">
        <span class="nhan-loai">{{sanpham.loai}}</span>
        <span *ngIf="sanpham.noiBat" class="nhan-noi-bat">Noi bat</span>
      </div>

      <h3 class="ten-san-pham">{{sanpham.ten}}</h3>
      <p class="mo-ta-san-pham">{{sanpham.mota}}</p>

      <div class="dong-gia-san-pham">
        <p class="gia-san-pham">{{sanpham.gia | number}} d</p>
        <button (click)="themVaoGio()" class="nut-vien nut-them">Them</button>
      </div>
    </div>
  </article>`
})
export class TheSanPhamComponent {
  @Input({ required: true }) sanpham!: SanPham;

  constructor(private giohang: GiohangService) { }

  themVaoGio() {
    this.giohang.them(this.sanpham);
  }
}
