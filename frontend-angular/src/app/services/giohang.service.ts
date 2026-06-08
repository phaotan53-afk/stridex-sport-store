import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SanPham } from '../models/sanpham';

@Injectable({ providedIn: 'root' })
export class GiohangService {

  private danhSachNguon = new BehaviorSubject<any[]>([]);
  danhSach$ = this.danhSachNguon.asObservable();

  them(sp: SanPham) {
    const ds = this.danhSachNguon.value;
    const item = ds.find(x => x.id === sp.id);

    if (item) item.soLuong++;
    else ds.push({ ...sp, soLuong: 1 });

    this.danhSachNguon.next([...ds]);
  }

  tang(sp: any) {
    sp.soLuong++;
    this.danhSachNguon.next([...this.danhSachNguon.value]);
  }

  giam(sp: any) {
    if (sp.soLuong > 1) sp.soLuong--;
    this.danhSachNguon.next([...this.danhSachNguon.value]);
  }

  xoa(id: number) {
    this.danhSachNguon.next(
      this.danhSachNguon.value.filter(sp => sp.id !== id)
    );
  }

  xoaTatCa() {
    this.danhSachNguon.next([]);
  }

  tongTien() {
    return this.danhSachNguon.value.reduce(
      (tong, sp) => tong + sp.gia * sp.soLuong, 0
    );
  }

  soLuong() {
    return this.danhSachNguon.value.reduce(
      (tong, sp) => tong + sp.soLuong, 0
    );
  }
}