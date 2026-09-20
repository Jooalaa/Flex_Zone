import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const API = 'http://localhost:3000/users';
const PAGE_SIZE = 5;

@Component({
  selector: 'app-admin-users',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-users.html',
})
export class AdminUsers implements OnInit {

  http = inject(HttpClient)

  users = signal<any[]>([])
  searchTerm = signal('')
  page = signal(1)
  editingId = signal<number | null>(null)
  showForm = signal(false)

  fg = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('user', Validators.required),
    goal: new FormControl('General Fitness'),
    level: new FormControl('Beginner'),
  })

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim()
    return this.users().filter(u => !term || u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term))
  })

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)))

  paged = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE
    return this.filtered().slice(start, start + PAGE_SIZE)
  })

  ngOnInit() {
    this.load()
  }

  load() {
    this.http.get<any[]>(API).subscribe(users => this.users.set(users))
  }

  startCreate() {
    this.editingId.set(null)
    this.fg.reset({ name: '', email: '', password: '', role: 'user', goal: 'General Fitness', level: 'Beginner' })
    this.showForm.set(true)
  }

  startEdit(user: any) {
    this.editingId.set(user.id)
    this.fg.reset(user)
    this.showForm.set(true)
  }

  cancel() {
    this.showForm.set(false)
    this.editingId.set(null)
  }

  save() {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched()
      return
    }

    const id = this.editingId()
    const request = id ? this.http.put(`${API}/${id}`, this.fg.value) : this.http.post(API, this.fg.value)

    request.subscribe(() => {
      this.load()
      this.cancel()
    })
  }

  remove(user: any) {
    if (!confirm(`Delete user "${user.name}"?`)) return
    this.http.delete(`${API}/${user.id}`).subscribe(() => this.load())
  }
}
