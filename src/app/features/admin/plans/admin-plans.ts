import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const API = 'http://localhost:3000/plans';
const PAGE_SIZE = 5;

@Component({
  selector: 'app-admin-plans',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-plans.html',
})
export class AdminPlans implements OnInit {

  http = inject(HttpClient)

  plans = signal<any[]>([])
  searchTerm = signal('')
  page = signal(1)
  editingId = signal<number | null>(null)
  showForm = signal(false)

  fg = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    icon: new FormControl('💪', Validators.required),
    desc: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    calories: new FormControl(300, [Validators.required, Validators.min(0)]),
    level: new FormControl('Beginner', Validators.required),
    rating: new FormControl(4.5, [Validators.required, Validators.min(0), Validators.max(5)]),
    tags: new FormControl(''), // comma separated
  })

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim()
    return this.plans().filter(p => !term || p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term))
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
    this.http.get<any[]>(API).subscribe(plans => this.plans.set(plans))
  }

  startCreate() {
    this.editingId.set(null)
    this.fg.reset({ title: '', category: '', icon: '💪', desc: '', duration: '', calories: 300, level: 'Beginner', rating: 4.5, tags: '' })
    this.showForm.set(true)
  }

  startEdit(plan: any) {
    this.editingId.set(plan.id)
    this.fg.reset({ ...plan, tags: plan.tags.join(', ') })
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
      calories: Number(value.calories),
      rating: Number(value.rating),
      tags: (value.tags ?? '').split(',').map((t: string) => t.trim()).filter(Boolean),
    }

    const id = this.editingId()
    const request = id ? this.http.put(`${API}/${id}`, payload) : this.http.post(API, payload)

    request.subscribe(() => {
      this.load()
      this.cancel()
    })
  }

  remove(plan: any) {
    if (!confirm(`Delete plan "${plan.title}"?`)) return
    this.http.delete(`${API}/${plan.id}`).subscribe(() => this.load())
  }
}
