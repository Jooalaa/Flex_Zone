import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ClassService } from '../../../core/services/class.service';
import { TrainerService } from '../../../core/services/trainer.service';
import { AuthService } from '../../../core/services/auth.service';
import { GymClass, Trainer } from '../../../core/models/models';

interface ClassView extends GymClass {
  trainerName: string;
}

@Component({
  selector: 'app-classes',
  imports: [],
  templateUrl: './classes.html',
})
export class Classes implements OnInit {
  classService = inject(ClassService)
  trainerService = inject(TrainerService)
  authService = inject(AuthService)

  loading = signal(true);
  loadError = signal(false);
  classes = signal<ClassView[]>([]);
  categoryFilter = signal('All');
  bookingMessage = signal<string | null>(null);

  categories = computed(() => ['All', ...new Set(this.classes().map((c) => c.category))]);

  filteredClasses = computed(() => {
    const category = this.categoryFilter();
    return category === 'All' ? this.classes() : this.classes().filter((c) => c.category === category);
  });

  ngOnInit() {
    forkJoin({
      classes: this.classService.getAll(),
      trainers: this.trainerService.getAll(),
    }).subscribe({
      next: ({ classes, trainers }) => {
        const trainerMap = new Map<number, Trainer>(trainers.map((t) => [t.id, t]));
        this.classes.set(
          classes.map((c) => ({ ...c, trainerName: trainerMap.get(c.trainerId)?.name ?? 'TBA' })),
        );
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set(true);
      },
    });
  }

  book(gymClass: ClassView) {
    const user = this.authService.currentUserSignal();
    if (!user || gymClass.spotsLeft <= 0) return;

    this.classService.book(user.id, gymClass.id).subscribe(() => {
      this.classService.decrementSpot(gymClass).subscribe((updated) => {
        this.classes.update((list) =>
          list.map((c) => (c.id === updated.id ? { ...c, spotsLeft: updated.spotsLeft } : c)),
        );
        this.bookingMessage.set(`You're booked into "${gymClass.title}"!`);
        setTimeout(() => this.bookingMessage.set(null), 3000);
      });
    });
  }
}
