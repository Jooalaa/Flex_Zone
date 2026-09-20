import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const API = 'http://localhost:3000/trainers';
const PAGE_SIZE = 5;

@Component({
  selector: 'app-admin-trainers',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-trainers.html',
})
export class AdminTrainers implements OnInit {

  http = inject(HttpClient)

  trainers = signal<any[]>([])
  searchTerm = signal('')
  page = signal(1)
  editingId = signal<number | null>(null)
  showForm = signal(false)

  fg = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    rating: new FormControl(4.5, [Validators.required, Validators.min(0), Validators.max(5)]),
    reviews: new FormControl(0, [Validators.required, Validators.min(0)]),
    specialties: new FormControl('', Validators.required), // comma separated in the form
  })

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim()
    return this.trainers().filter(t => !term || t.name.toLowerCase().includes(term) || t.role.toLowerCase().includes(term))
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
    this.http.get<any[]>(API).subscribe(trainers => this.trainers.set(trainers))
  }

  initialsOf(name: any) {
    return name.split(' ').map((p: string) => p[0]).join('').toUpperCase().slice(0, 2)
  }

  startCreate() {
    this.editingId.set(null)
    this.fg.reset({ name: '', role: '', experience: '', rating: 4.5, reviews: 0, specialties: '' })
    this.showForm.set(true)
  }

  startEdit(trainer: any) {
    this.editingId.set(trainer.id)
    this.fg.reset({ ...trainer, specialties: trainer.specialties.join(', ') })
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

    const value = this.fg.value
    const payload = {
      ...value,
      rating: Number(value.rating),
      reviews: Number(value.reviews),
      specialties: (value.specialties || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      initials: this.initialsOf(value.name),
    }

    const id = this.editingId()
    const request = id ? this.http.put(`${API}/${id}`, payload) : this.http.post(API, payload)

    request.subscribe(() => {
      this.load()
      this.cancel()
    })
  }

  remove(trainer: any) {
    if (!confirm(`Delete trainer "${trainer.name}"?`)) return
    this.http.delete(`${API}/${trainer.id}`).subscribe(() => this.load())
  }
}
