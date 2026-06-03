import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SanphamService } from '../../services/sanpham.service';
import { SanPham } from '../../models/sanpham';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section class="khung trang-admin">

    <div class="dau-admin">
      <div>
        <p>QUẢN TRỊ HỆ THỐNG</p>
        <h1>Quản lý sản phẩm</h1>
      </div>

      <button class="nut-do" (click)="dangXuat()">Đăng xuất</button>
    </div>

    <form class="form-admin" (ngSubmit)="luuSanPham()">

      <input [(ngModel)]="sanPhamDangSua.ten" name="ten" placeholder="Tên sản phẩm" required>

      <select [(ngModel)]="sanPhamDangSua.loai" name="loai">
        <option value="Giay">Giày</option>
        <option value="Ao">Áo</option>
        <option value="Quan">Quần</option>
        <option value="Phu kien">Phụ kiện</option>
        <option value="Bong">Bóng</option>
      </select>

      <input [(ngModel)]="sanPhamDangSua.gia" name="gia" type="number" placeholder="Giá">

      <input [(ngModel)]="sanPhamDangSua.hinh" name="hinh" placeholder="Link hình ảnh">

      <textarea [(ngModel)]="sanPhamDangSua.mota" name="mota" placeholder="Mô tả"></textarea>

      <label class="chon-noi-bat">
        <input [(ngModel)]="sanPhamDangSua.noiBat" name="noiBat" type="checkbox">
        Sản phẩm nổi bật
      </label>

      <div class="nut-form-admin">
        <button class="nut-do" type="submit">
          {{dangSua ? 'Cập nhật' : 'Thêm sản phẩm'}}
        </button>

        <button class="nut-vien" type="button" (click)="lamMoiForm()">
          Làm mới
        </button>
      </div>

    </form>

    <div class="bang-admin">

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình</th>
            <th>Tên</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Nổi bật</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let sp of dsSanPham">
            <td>{{sp.id}}</td>

            <td>
              <img [src]="sp.hinh">
            </td>

            <td>{{sp.ten}}</td>

            <td>{{sp.loai}}</td>

            <td>{{sp.gia | number}} đ</td>

            <td>{{sp.noiBat ? 'Có' : 'Không'}}</td>

            <td>
              <button class="nut-sua" (click)="chonSua(sp)">Sửa</button>
              <button class="nut-xoa-admin" (click)="xoaSanPham(sp.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </section>
  `
})
export class AdminComponent {
  dsSanPham: SanPham[] = [];
  dangSua = false;

  sanPhamDangSua: SanPham = {
    id: 0,
    ten: '',
    loai: 'Giay',
    gia: 0,
    hinh: '',
    mota: '',
    noiBat: false
  };

  constructor(
    private sanphamService: SanphamService,
    private auth: AuthService,
    private router: Router
  ) {
    this.taiSanPham();
  }

  taiSanPham() {
    this.sanphamService.layTatCa().subscribe(ds => {
      this.dsSanPham = ds;
    });
  }

  luuSanPham() {
    if (this.dangSua) {
      this.sanphamService
        .suaSanPham(this.sanPhamDangSua.id, this.sanPhamDangSua)
        .subscribe(() => {
          alert('Cập nhật sản phẩm thành công!');
          this.taiSanPham();
          this.lamMoiForm();
        });
    } else {
      const sanPhamMoi = {
        ...this.sanPhamDangSua,
        id: 0
      };

      this.sanphamService.themSanPham(sanPhamMoi).subscribe(() => {
        alert('Thêm sản phẩm thành công!');
        this.taiSanPham();
        this.lamMoiForm();
      });
    }
  }

  chonSua(sp: SanPham) {
    this.dangSua = true;
    this.sanPhamDangSua = { ...sp };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  xoaSanPham(id: number) {
    const dongY = confirm('Bạn có chắc muốn xóa sản phẩm này không?');

    if (!dongY) return;

    this.sanphamService.xoaSanPham(id).subscribe(() => {
      alert('Xóa sản phẩm thành công!');
      this.taiSanPham();
    });
  }

  lamMoiForm() {
    this.dangSua = false;

    this.sanPhamDangSua = {
      id: 0,
      ten: '',
      loai: 'Giay',
      gia: 0,
      hinh: '',
      mota: '',
      noiBat: false
    };
  }

  dangXuat() {
    this.auth.dangXuat();
    this.router.navigate(['/dang-nhap']);
  }
}