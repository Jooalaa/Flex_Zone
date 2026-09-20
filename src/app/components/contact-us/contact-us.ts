import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface ContactInfo {
  icon: string; 
  title: string;
  details: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-contact-us',
  styleUrl: './contact-us.css',
  templateUrl: './contact-us.html',
})
export class ContactUs {
  contactList: ContactInfo[] = [
    {
      icon: 'fa-solid fa-location-dot', 
      title: 'VISIT US',
      details: '123 Fitness Street, Nasr City, Cairo, Egypt'
    },
    {
      icon: 'fa-solid fa-phone',
      title: 'CALL US',
      details: '+20 100 123 4567'
    },
    {
      icon: 'fa-solid fa-envelope',
      title: 'EMAIL US',
      details: 'hello@flexzone.com'
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'WORKING HOURS',
      details: 'Daily: 6:00 AM – 11:00 PM'
    }
  ];

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
