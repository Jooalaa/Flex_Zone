import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-about-as',
  styleUrl: './about-as.css',
  templateUrl: './about-as.html',
})
export class AboutAs {
    /* ===== Features ===== */
  features = [
    { icon: '💪', title: 'Results First',    desc: 'Every feature, every plan, every class is designed with one goal — delivering real, measurable results for our members.' },
    { icon: '🧠', title: 'Science-Backed',   desc: 'Our workout and nutrition programs are built on the latest sports science and evidence-based fitness research.' },
    { icon: '🤝', title: 'Community',        desc: 'We believe fitness is better together. Our community, challenges, and leaderboards keep members motivated and connected.' },
    { icon: '♿', title: 'Inclusive',         desc: 'Fitness is for everyone. FlexZone offers beginner-to-advanced plans that make gym culture welcoming and accessible.' },
    { icon: '⚡', title: 'Innovation',        desc: 'We continuously improve our platform with new technology — from AI coaching to real-time progress analytics.' },
    { icon: '🌱', title: 'Sustainability',   desc: 'We promote long-term healthy habits, not quick fixes. Our programs are built for life-long transformation.' }
  ];

//  time line 

timelineEvents = [
  { 
    year: '2020', 
    title: 'FlexZone Founded', 
    desc: 'Started as a small personal training studio in Cairo with 3 trainers and 50 members.',
    position: 'left' 
  },
  { 
    year: '2021', 
    title: 'Digital Platform Launch', 
    desc: 'Launched the first version of the FlexZone web app with workout tracking and nutrition plans.',
    position: 'right' 
  },
  { 
    year: '2022', 
    title: '500 Members Milestone', 
    desc: 'Reached 500 active members and expanded our trainer roster to 12 certified professionals.',
    position: 'left' 
  },
  { 
    year: '2023', 
    title: 'Smart Features Added', 
    desc: 'Introduced AI-powered recommendations, challenges system, and the live class booking feature.',
    position: 'right' 
  }
];

// team info

teamInfo=[
  {
    imgId:'KH',
    name: 'Kaled Hassan',
    job:'CEO & Co-Founder',
    descripion:'Former competitive athlete with 15 years in fitness industry.'
  },
    {
    imgId:'AM', 
    name: 'Ahmed Mohamed',
    job:'Head Trainer & CPT',
    descripion:'NASM-certified trainer with 7+ years of coaching experience.'
  },
    {
      imgId:'SM',
    name: 'Sara Mohamed',
    job:'Yoga & Wellness Lead',
    descripion:'RYT-500 certified yoga instructor and mindfulness coach.'
  },
    {
      imgId:'OK',
    name: 'Omar Khalil',
    job:'HIIT & Boxing Coach',
    descripion:'USA Boxing certified coach and ACSM-certified personal trainer.'
  },
  {
    imgId:'NS',
    name:'Nour Salah',
    job:'Dance Fitness Instructor',
    descripion:'Zumba licensed instructor and Les Mills certified coach.',
  },
    {
      imgId:'KH',
    name:'Karim Hassan',
    job:'Nutrition & Strength Coach',
    descripion:'Precision Nutrition Level 2 certified coach and competitive powerlifter.',
  },
]
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
