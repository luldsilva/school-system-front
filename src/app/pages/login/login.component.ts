import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  nome = '';
  senha = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.error = '';

    this.authService.login(this.nome, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: () => {
        this.error = 'Usuário ou senha inválidos';
      },
    });
  }
}
