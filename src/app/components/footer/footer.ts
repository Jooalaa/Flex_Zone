import { Component } from '@angular/core';

export interface ContactInfo {
  icon: string;
  text: string;
}

export interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  currentYear: number = new Date().getFullYear();

  platformLinks: string[] = [
    'Workout Library',
    'Nutrition Plans',
    'Class Booking',
    'Progress Tracking',
    'Challenges',
  ];

  companyLinks: string[] = [
    'About Us',
    'Our Trainers',
    'Contact',
    'Privacy Policy',
    'Terms of Service',
  ];

  contactInfo: ContactInfo[] = [
    { icon: '📍', text: '123 Fitness Street, Cairo, Egypt' },
    { icon: '📞', text: '+20 100 123 4567' },
    { icon: '✉️', text: 'hello@flexzone.com' },
    { icon: '⏰', text: 'Daily 6AM – 11PM' },
  ];

  socialLinks: SocialLink[] = [
    { icon: '📷', url: '#', label: 'Instagram' },
    { icon: '🎵', url: '#', label: 'TikTok' },
    { icon: '▶️', url: '#', label: 'YouTube' },
    { icon: '👥', url: '#', label: 'Community' },
  ];
}