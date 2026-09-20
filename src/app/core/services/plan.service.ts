import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkoutPlan } from '../models/models';

const API = 'http://localhost:3000/plans';

@Injectable({ providedIn: 'root' })
export class PlanService {
  http = inject(HttpClient)

  getAll(): Observable<WorkoutPlan[]> {
    return this.http.get<WorkoutPlan[]>(API);
  }

  getById(id: number): Observable<WorkoutPlan> {
    return this.http.get<WorkoutPlan>(`${API}/${id}`);
  }

  create(plan: Omit<WorkoutPlan, 'id'>): Observable<WorkoutPlan> {
    return this.http.post<WorkoutPlan>(API, plan);
  }

  update(id: number, plan: Partial<WorkoutPlan>): Observable<WorkoutPlan> {
    return this.http.put<WorkoutPlan>(`${API}/${id}`, plan);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}`);
  }
}
