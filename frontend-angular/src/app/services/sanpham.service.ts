import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { SanPham } from '../models/sanpham';

@Injectable({ providedIn: 'root' })
export class SanphamService {
  private api = 'http://localhost:5000/api/sanpham';
  private duLieuMau: SanPham[] = [
    { id: 1, ten: 'Giày chạy bộ Velocity X', loai: 'Giày', gia: 2490000, giaCu: 2990000, hinh: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop', mota: 'Thiet ke nhe, em chan, phu hop chay bo va tap luyen hang ngay.', noiBat: true },
    { id: 2, ten: 'Áo tập Pro Dry', loai: 'Áo', gia: 690000, hinh: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop', mota: 'Vai thoang khi, form toi gian, mang lai cam giac cao cap.', noiBat: true },
    { id: 3, ten: 'Balo Sport Max', loai: 'Phụ kiện', gia: 890000, hinh: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop', mota: 'Balo the thao rong rai, ngan rieng cho giay va laptop.', noiBat: false },
    { id: 4, ten: 'Quần short Training', loai: 'Quần', gia: 520000, hinh: 'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?q=80&w=1200&auto=format&fit=crop', mota: 'Quan short co gian tot, de van dong, phong cach hien dai.', noiBat: false },
    { id: 5, ten: 'Giày sân cỏ Speed Red', loai: 'Giày', gia: 1990000, hinh: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop', mota: 'Do bam tot, mau do noi bat, phu hop bong da san co nhan tao.', noiBat: true },
    { id: 6, ten: 'Bình nước Stridex', loai: 'Phụ kiện', gia: 220000, hinh: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop', mota: 'Binh nuoc gon nhe, thiet ke toi gian, tien loi khi tap luyen.', noiBat: false }
  ];

  constructor(private http: HttpClient) { }

  layTatCa(): Observable<SanPham[]> {
    return this.http.get<SanPham[]>(this.api).pipe(catchError(() => of(this.duLieuMau)));
  }

  layTheoId(id: number): Observable<SanPham | undefined> {
    return this.http.get<SanPham>(`${this.api}/${id}`).pipe(
      catchError(() => of(this.duLieuMau.find(sp => sp.id === id)))
    );
  }
  layNoiBat() {
    return this.http.get<SanPham[]>(
      'http://localhost:5000/api/sanpham/noi-bat'
    );
  }
}
