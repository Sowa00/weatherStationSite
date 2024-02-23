import {Component, Input, OnInit} from '@angular/core';
import { AuthService} from "../auth.service";
import { Router } from '@angular/router';
import {User} from "../user";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  public isAuthenticated: boolean = false;
  public userInfo: User | null = null;
  @Input() menuItems: MenuItem[] = [];

  constructor(private router: Router,
              private authService: AuthService,) {
  }

  ngOnInit(): void{
    this.subscribeToAuthChanges();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  subscribeToAuthChanges(): void {
    this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
      if (authenticated) {
        this.authService.getUserInfo().subscribe(userInfo => {
          this.userInfo = userInfo;
        });
      }
    });
  }
}

export interface MenuItem {
  label: string;
  route: string;
}
