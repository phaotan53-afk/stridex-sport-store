import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { SanPham } from '../models/sanpham';

@Injectable({ providedIn: 'root' })
export class SanphamService {
  private api = 'http://localhost:5000/api/sanpham';
  private duLieuMau: SanPham[] = [
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
  themSanPham(sanpham: SanPham) {
    return this.http.post<SanPham>(
      'http://localhost:5000/api/sanpham',
      sanpham
    );
  }

  suaSanPham(id: number, sanpham: SanPham) {
    return this.http.put<SanPham>(
      `http://localhost:5000/api/sanpham/${id}`,
      sanpham
    );
  }

  xoaSanPham(id: number) {
    return this.http.delete(
      `http://localhost:5000/api/sanpham/${id}`
    );
  }
}
