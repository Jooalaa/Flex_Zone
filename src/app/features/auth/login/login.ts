import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {

  authService = inject(AuthService)
  router = inject(Router)

  errorMessage = signal('')

  fg = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  submit() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched()
      return
    }

    this.errorMessage.set('')

    this.authService.login(this.fg.value.email, this.fg.value.password).subscribe(users => {
      const user = this.authService.checkLogin(users, this.fg.value.password)

      if (!user) {
        this.errorMessage.set('Invalid email or password.')
        return
      }

      this.router.navigate([user.role == 'admin' ? '/admin' : '/dashboard'])
    })
  }
}
