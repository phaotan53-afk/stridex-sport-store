import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { TrangchuComponent } from './pages/trangchu/trangchu.component';
import { SanphamComponent } from './pages/sanpham/sanpham.component';
import { ChitietSanphamComponent } from './pages/chitiet-sanpham/chitiet-sanpham.component';
import { GiohangComponent } from './pages/giohang/giohang.component';
import { DangnhapComponent } from './pages/dangnhap/dangnhap.component';
import { dangNhapGuard } from './guards/dangnhap.guard';
import { DanhmucSanphamComponent } from './pages/danhmuc-sanpham/danhmuc-sanpham';
import { LichsuDonhangComponent } from './pages/lichsu-donhang/lichsu-donhang';
export const routes: Routes = [
  { path: '', component: TrangchuComponent },

  { path: 'san-pham', component: SanphamComponent },

  { path: 'san-pham/:id', component: ChitietSanphamComponent },

  { path: 'danh-muc/:slug', component: DanhmucSanphamComponent },

  {
    path: 'gio-hang',
    component: GiohangComponent,
    canActivate: [dangNhapGuard]
  },

  { path: 'dang-nhap', component: DangnhapComponent },

  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin/admin').then(m => m.AdminComponent)
  },
  {
    path: 'lich-su-don-hang',
    component: LichsuDonhangComponent,
    canActivate: [dangNhapGuard]
  },
  {
    path: 'thanh-toan-thanh-cong',
    loadComponent: () =>
      import('./pages/thanh-toan-ket-qua/thanh-toan-ket-qua.component')
        .then(m => m.ThanhToanKetQuaComponent)
  },
  {
    path: 'thanh-toan-that-bai',
    loadComponent: () =>
      import('./pages/thanh-toan-ket-qua/thanh-toan-ket-qua.component')
        .then(m => m.ThanhToanKetQuaComponent)
  },
  { path: '**', redirectTo: '' }
];