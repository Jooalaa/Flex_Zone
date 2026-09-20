export type Role = 'user' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  goal?: string;
  level?: string;
  joinDate?: string;
}

export interface Trainer {
  id: number;
  initials: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  experience: string;
  specialties: string[];
}

export interface WorkoutPlan {
  id: number;
  category: string;
  icon: string;
  rating: number;
  title: string;
  desc: string;
  duration: string;
  calories: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface GymClass {
  id: number;
  title: string;
  trainerId: number;
  category: string;
  schedule: string;
  capacity: number;
  spotsLeft: number;
}

export interface Booking {
  id: number;
  userId: number;
  classId: number;
  date: string;
  status: 'confirmed' | 'cancelled';
}

export interface KnowledgeEntry {
  id: number;
  topic: string;
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  sources?: string[];
}
