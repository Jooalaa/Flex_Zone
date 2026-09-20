import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {

  authService = inject(AuthService)
  router = inject(Router)

  errorMessage = signal('')

  fg = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    goal: new FormControl('Build Muscle', [Validators.required]),
    level: new FormControl('Beginner', [Validators.required]),
  })

  submit() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched()
      return
    }

    this.errorMessage.set('')

    this.authService.checkEmailExists(this.fg.value.email).subscribe(existing => {
      if (existing.length > 0) {
        this.errorMessage.set('An account with this email already exists.')
        return
      }

      const newUser = {
        ...this.fg.value,
        role: 'user',
        joinDate: new Date().toISOString().slice(0, 10),
      }

      this.authService.register(newUser).subscribe(user => {
        this.authService.saveUser(user)
        this.router.navigate(['/dashboard'])
      })
    })
  }
}
