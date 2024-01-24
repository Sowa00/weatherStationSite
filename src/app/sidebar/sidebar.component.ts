// sidebar.component.ts

import { Component, Input } from '@angular/core';
import { AuthService} from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() menuItems: MenuItem[] = [];

  // Dodaj inne właściwości, jeśli są potrzebne

  constructor(private router: Router,
              private authService: AuthService,) {
    // Tutaj możesz inicjować wartości właściwości, jeśli to konieczne
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}

export interface MenuItem {
  label: string;
  route: string;
  // Dodaj inne właściwości, jeśli są potrzebne

}
