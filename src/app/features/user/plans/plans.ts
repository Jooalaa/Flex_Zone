import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { PlanService } from '../../../core/services/plan.service';
import { WorkoutPlan } from '../../../core/models/models';

@Component({
  selector: 'app-plans',
  imports: [],
  templateUrl: './plans.html',
})
export class Plans implements OnInit {
  planService = inject(PlanService)

  plans = signal<WorkoutPlan[]>([]);
  loading = signal(true);

  searchTerm = signal('');
  levelFilter = signal('All');
  sortBy = signal<'rating' | 'calories'>('rating');

  levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  filteredPlans = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const level = this.levelFilter();
    const sort = this.sortBy();

    let result = this.plans().filter((plan) => {
      const matchesTerm =
        !term ||
        plan.title.toLowerCase().includes(term) ||
        plan.category.toLowerCase().includes(term) ||
        plan.tags.some((tag) => tag.toLowerCase().includes(term));
      const matchesLevel = level === 'All' || plan.level === level;
      return matchesTerm && matchesLevel;
    });

    result = [...result].sort((a, b) =>
      sort === 'rating' ? b.rating - a.rating : b.calories - a.calories,
    );

    return result;
  });

  ngOnInit() {
    this.planService.getAll().subscribe({
      next: (plans) => {
        this.plans.set(plans);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
