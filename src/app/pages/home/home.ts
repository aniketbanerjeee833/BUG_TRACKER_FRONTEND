import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
   constructor(
    
    private authService: AuthService,
  
  ) {}
  user = JSON.parse(localStorage.getItem('user')!);
  
  onLogout() {
this.authService.logout();
  }
}
