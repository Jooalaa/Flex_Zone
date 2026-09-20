import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  stats = [
    { number: '1,248', label: 'Active Members' },
    { number: '50+',   label: 'Workout Plans' },
    { number: '24',    label: 'Expert Trainers' },
    { number: '4.9★',  label: 'Average Rating' }
  ];

  /* ===== Features ===== */
  features = [
    { icon: '🏋️', title: 'Smart Workouts',      desc: 'Personalized workout plans with a built-in timer and progress tracking for every fitness level.' },
    { icon: '🥗', title: 'Nutrition Planning',   desc: 'Custom meal plans based on your goal — lose weight, build muscle, or maintain your physique.' },
    { icon: '📊', title: 'Progress Analytics',   desc: 'Visual charts and stats to track your weight, BMI, measurements, and overall transformation.' },
    { icon: '📅', title: 'Class Booking',        desc: 'Book Yoga, CrossFit, HIIT, Boxing and more directly from the app. No waiting, no hassle.' },
    { icon: '🏆', title: 'Challenges & XP',      desc: 'Join fitness challenges, earn XP points, unlock badges, and climb the global leaderboard.' },
    { icon: '🤖', title: 'AI FlexBot Assistant', desc: 'Get instant fitness advice, workout recommendations and nutrition tips from FlexBot 24/7.' }
  ];

  /* ===== Workout Plans ===== */
  workoutPlans = [
    {
      category: 'Chest', icon: '💪', rating: '4.8',
      title: 'Chest & Triceps Power',
      desc: 'Complete chest and triceps workout for building upper body mass and strength.',
      duration: '45 min', calories: '420 kcal',
      level: 'Intermediate', levelClass: 'intermediate',
      tags: ['Chest', 'Triceps', 'Shoulders']
    },
    {
      category: 'Legs', icon: '🦵', rating: '4.9',
      title: 'Leg Day Destroyer',
      desc: 'Brutal leg day workout that will push your lower body to the limit.',
      duration: '60 min', calories: '680 kcal',
      level: 'Advanced', levelClass: 'advanced',
      tags: ['Quads', 'Hamstrings', 'Glutes']
    },
    {
      category: 'Back', icon: '🔙', rating: '4.7',
      title: 'Back & Biceps Builder',
      desc: 'Build a wide, thick back panel with powerful biceps.',
      duration: '50 min', calories: '480 kcal',
      level: 'Intermediate', levelClass: 'intermediate',
      tags: ['Lats', 'Traps', 'Biceps']
    },
    {
      category: 'Shoulders', icon: '🎯', rating: '4.6',
      title: 'Shoulder Sculpt',
      desc: 'Complete shoulder workout for building 3D round shoulders.',
      duration: '40 min', calories: '320 kcal',
      level: 'Beginner', levelClass: 'beginner',
      tags: ['Front Delts', 'Side Delts', 'Rear Delts']
    },
    {
      category: 'Full Body', icon: '⚡', rating: '5.0',
      title: 'Full Body Power',
      desc: 'The ultimate full body compound workout. Maximum results in minimum time.',
      duration: '70 min', calories: '800 kcal',
      level: 'Advanced', levelClass: 'advanced',
      tags: ['Full Body']
    },
    {
      category: 'Core', icon: '🔥', rating: '4.5',
      title: 'Core & Abs Shred',
      desc: 'Get shredded abs with this focused core workout.',
      duration: '30 min', calories: '250 kcal',
      level: 'Beginner', levelClass: 'beginner',
      tags: ['Core', 'Abs', 'Obliques']
    }
  ];

  /* ===== AI Section ===== */
  aiFeatures = [
    'Custom Workout Schedule',
    'Personalized Nutrition',
    'Calorie Targets',
    'Recommended Classes'
  ];

  aiResult = [
    { icon: '🏋️', text: '4 Days / Week Training' },
    { icon: '🥗', text: 'High Protein Diet' },
    { icon: '🔥', text: '2,750 Calories / Day' },
    { icon: '💪', text: 'Chest, Back, Legs, Shoulders' },
    { icon: '⭐', text: 'Intermediate Level Programs' }
  ];

  /* ===== Trainers ===== */
  trainers = [
    { initials: 'AM', name: 'Ahmed Mohamed', role: 'Certified Personal Trainer', rating: '4.9', reviews: 128, experience: '7 Years Experience', specialties: ['Muscle Building', 'Strength Training', 'Weight Loss'] },
    { initials: 'SM', name: 'Sara Mahmoud',  role: 'Yoga & Pilates Instructor',  rating: '4.8', reviews: 96,  experience: '5 Years Experience', specialties: ['Yoga', 'Pilates', 'Flexibility'] },
    { initials: 'OK', name: 'Omar Khalil',   role: 'HIIT & Boxing Coach',        rating: '4.7', reviews: 82,  experience: '6 Years Experience', specialties: ['HIIT', 'Boxing', 'Cardio'] },
    { initials: 'NS', name: 'Nour Salah',    role: 'Dance Fitness Instructor',   rating: '4.9', reviews: 110, experience: '4 Years Experience', specialties: ['Zumba', 'Dance Fitness', 'Cardio'] }
  ];

  /* ===== Pricing ===== */
  pricingTiers = [
    {
      name: 'Starter', icon: '🌱', price: '$29', period: '/month', isPopular: false,
      features: [
        { text: 'Gym Access 4 Days/Week', included: true },
        { text: '10+ Workout Plans',      included: true },
        { text: 'Basic Nutrition Guide',  included: true },
        { text: 'Progress Tracking',      included: true },
        { text: 'FlexBot AI Access',      included: true },
        { text: 'Live Classes',           included: false },
        { text: 'Personal Trainer',       included: false },
        { text: 'Custom Meal Plans',      included: false }
      ]
    },
    {
      name: 'Pro', icon: '⚡', price: '$59', period: '/month', isPopular: true,
      features: [
        { text: 'Unlimited Gym Access',      included: true },
        { text: 'All 50+ Workout Plans',     included: true },
        { text: 'Custom Nutrition Plans',    included: true },
        { text: 'All Class Booking',         included: true },
        { text: 'Challenges & Leaderboard',  included: true },
        { text: 'FlexBot Premium',           included: true },
        { text: 'Progress Analytics',        included: true },
        { text: 'Dedicated Personal Trainer',included: false }
      ]
    },
    {
      name: 'Elite', icon: '👑', price: '$99', period: '/month', isPopular: false,
      features: [
        { text: 'Everything in Pro',        included: true },
        { text: 'Dedicated Personal Trainer',included: true },
        { text: 'Weekly Check-ins',         included: true },
        { text: 'Custom Training Program',  included: true },
        { text: 'Nutrition Coaching',       included: true },
        { text: 'Priority Class Booking',   included: true },
        { text: 'VIP Community Access',     included: true }
      ]
    }
  ];

  /* ===== Testimonials ===== */
  activeTestimonial = 0;

  testimonials = [
    { initial: 'M', name: 'Mahmoud Ahmed', meta: 'Member • 8 months', text: 'FlexZone completely transformed my life. I lost 12kg in 4 months following their nutrition and workout plans. The dashboard keeps me motivated every single day!' },
    { initial: 'H', name: 'Hana Youssef',  meta: 'Member • 1 year',   text: 'The class booking system is a game changer. I book my yoga sessions in seconds and the trainers are genuinely world-class. Best decision I made this year.' },
    { initial: 'K', name: 'Karim Adel',    meta: 'Member • 6 months', text: 'FlexBot answers every question I have about form and nutrition instantly. It feels like having a personal coach in my pocket 24/7.' }
  ];

  /* ===== FAQ ===== */
  openFaq: number | null = null;

  faqs = [
    { q: 'Do I need gym experience to start?', a: 'Not at all. FlexZone has beginner-friendly programs with video guidance for every exercise, so you can start safely from day one.' },
    { q: 'Can I cancel my membership anytime?', a: 'Yes. All plans are month-to-month with no long-term contracts. You can cancel from your dashboard in a couple of clicks.' },
    { q: 'Are the workout plans customized for me?', a: 'Every plan adapts to your goal, experience level, available equipment and training days using our smart planning engine.' },
    { q: 'How does the FlexBot AI assistant work?', a: 'FlexBot is available 24/7 inside the app to answer questions about form, nutrition, recovery and to adjust your plan when you need it.' },
    { q: 'Can I book classes in advance?', a: 'Yes, Pro and Elite members can book classes up to two weeks in advance, with priority booking for Elite members.' }
  ];

  toggleFaq(i: number) {
    this.openFaq = this.openFaq === i ? null : i;
  }

  /* ===== Footer ===== */
  footerPlatform = ['Workout Library', 'Nutrition Plans', 'Class Booking', 'Progress Tracking', 'Challenges'];
  footerCompany  = ['About Us', 'Our Trainers', 'Contact', 'Privacy Policy', 'Terms of Service'];

  contactInfo = [
    { icon: '📍', text: '123 Fitness Street, Cairo, Egypt' },
    { icon: '📞', text: '+20 100 123 4567' },
    { icon: '✉️', text: 'hello@flexzone.com' },
    { icon: '🕒', text: 'Daily 6AM – 11PM' }
  ];
}