import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

const API = 'http://localhost:3000/classes';
const TRAINERS_API = 'http://localhost:3000/trainers';
const PAGE_SIZE = 5;

@Component({
  selector: 'app-admin-classes',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-classes.html',
})
export class AdminClasses implements OnInit {

  http = inject(HttpClient)

  classes = signal<any[]>([])
  trainers = signal<any[]>([])
  searchTerm = signal('')
  page = signal(1)
  editingId = signal<number | null>(null)
  showForm = signal(false)

  fg = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    trainerId: new FormControl(0, [Validators.required, Validators.min(1)]),
    schedule: new FormControl('', Validators.required),
    capacity: new FormControl(15, [Validators.required, Validators.min(1)]),
    spotsLeft: new FormControl(15, [Validators.required, Validators.min(0)]),
  })

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim()
    return this.classes().filter(c => !term || c.title.toLowerCase().includes(term) || c.category.toLowerCase().includes(term))
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
    forkJoin({
      classes: this.http.get<any[]>(API),
      trainers: this.http.get<any[]>(TRAINERS_API),
    }).subscribe(({ classes, trainers }) => {
      this.classes.set(classes)
      this.trainers.set(trainers)
    })
  }

  trainerName(id: number) {
    return this.trainers().find(t => t.id == id)?.name ?? 'Unassigned'
  }

  startCreate() {
    this.editingId.set(null)
    this.fg.reset({ title: '', category: '', trainerId: this.trainers()[0]?.id ?? 0, schedule: '', capacity: 15, spotsLeft: 15 })
    this.showForm.set(true)
  }

  startEdit(gymClass: any) {
    this.editingId.set(gymClass.id)
    this.fg.reset(gymClass)
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
      trainerId: Number(value.trainerId),
      capacity: Number(value.capacity),
      spotsLeft: Number(value.spotsLeft),
    }

    const id = this.editingId()
    const request = id ? this.http.put(`${API}/${id}`, payload) : this.http.post(API, payload)

    request.subscribe(() => {
      this.load()
      this.cancel()
    })
  }

  remove(gymClass: any) {
    if (!confirm(`Delete class "${gymClass.title}"?`)) return
    this.http.delete(`${API}/${gymClass.id}`).subscribe(() => this.load())
  }
}
