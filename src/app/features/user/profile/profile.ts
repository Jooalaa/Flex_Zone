import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {

  authService = inject(AuthService)

  saved = signal(false)

  fg = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    goal: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
    const user = this.authService.currentUserSignal()

    this.fg.patchValue({
      name: user.name,
      email: user.email,
      goal: user.goal,
      level: user.level,
    })
  }

  save() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched()
      return
    }

    this.saved.set(false)

    const updatedUser = { ...this.authService.currentUserSignal(), ...this.fg.value }

    this.authService.updateUser(updatedUser).subscribe(() => {
      this.saved.set(true)
    })
  }
}
