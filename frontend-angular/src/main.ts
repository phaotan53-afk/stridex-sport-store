import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { ThanhDieuHuongComponent } from './app/components/thanh-dieu-huong/thanh-dieu-huong.component';
import { ChanTrangComponent } from './app/components/chan-trang/chan-trang.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ThanhDieuHuongComponent, ChanTrangComponent],
  template: `
    <app-thanh-dieu-huong></app-thanh-dieu-huong>
    <main class="min-h-screen pt-20"><router-outlet></router-outlet></main>
    <app-chan-trang></app-chan-trang>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations()]
});
