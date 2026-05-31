import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SanPham } from '../models/sanpham';

@Injectable({ providedIn: 'root' })
export class GiohangService {
  private danhSachNguon = new BehaviorSubject<SanPham[]>([]);
  danhSach$ = this.danhSachNguon.asObservable();

  them(sp: SanPham) { this.danhSachNguon.next([...this.danhSachNguon.value, sp]); }
  xoa(id: number) { this.danhSachNguon.next(this.danhSachNguon.value.filter(sp => sp.id !== id)); }
  xoaTatCa() { this.danhSachNguon.next([]); }
  tongTien() { return this.danhSachNguon.value.reduce((tong, sp) => tong + sp.gia, 0); }
  soLuong() { return this.danhSachNguon.value.length; }
}
