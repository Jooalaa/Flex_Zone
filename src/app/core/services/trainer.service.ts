import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/models';

const API = 'http://localhost:3000/trainers';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  http = inject(HttpClient)

  getAll(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(API);
  }

  getById(id: number): Observable<Trainer> {
    return this.http.get<Trainer>(`${API}/${id}`);
  }

  create(trainer: Omit<Trainer, 'id'>): Observable<Trainer> {
    return this.http.post<Trainer>(API, trainer);
  }

  update(id: number, trainer: Partial<Trainer>): Observable<Trainer> {
    return this.http.put<Trainer>(`${API}/${id}`, trainer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}`);
  }
}
