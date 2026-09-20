import { Footer } from './../../../components/footer/footer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface product {
  id: number;
  name: string;
  image?: string;
  icon?: string;
  price: number;
  category: string;
  badge?: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  servings?: number;
  scoop?: number;
  proteinPerServing?: string;
}

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, Footer],
  selector: 'app-supplement-store',
  styleUrl: './supplement-store.css',
  templateUrl: './supplement-store.html',
})
export class SupplementStore {
  data: string = "All";
  products: product[] = [];

  constructor() {
    this.products = [
      // ================= Supplements & Nutrition =================
      {
        id: 1,
        name: 'Whey Protein Isolate - 2kg',
        image: 'https://edsport.com.cy/wp-content/uploads/2025/07/isolate_2_cookies.png',
        price: 2500,
        category: 'Supplements',
        badge: 'Best Seller',
        brand: 'Optimum Nutrition',
        rating: 5,
        reviews: 1240,
        description: 'Pure whey isolate for rapid muscle recovery and growth.',
        servings: 71,
        scoop: 1,
        proteinPerServing: '25g'
      },
      {
        id: 2,
        name: 'Creatine Monohydrate - 300g',
        image: 'https://tse1.mm.bing.net/th/id/OIP.4t6-nC_CtlvBKE1TEErvbwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 900,
        category: 'Supplements',
        badge: 'Top Rated',
        brand: 'MuscleTech',
        rating: 4,
        reviews: 850,
        description: 'Increases physical performance in successive bursts of short-term, high intensity exercise.',
        servings: 60,
        scoop: 1
      },
      {
        id: 3,
        name: 'Pre-Workout Energy Booster',
        image: 'https://tse1.mm.bing.net/th/id/OIP.jkbVwfE9PDdvZwiCQoHSDwHaIM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 1200,
        category: 'Supplements',
        brand: 'Cellucor',
        rating: 4.5,
        reviews: 620,
        servings: 30,
        scoop: 1
      },
      {
        id: 4,
        name: 'BCAA Amino Acids - 30 Servings',
        image: 'https://i5.walmartimages.com/seo/Evlution-Nutrition-BCAA-Energy-Amino-Acid-Pre-Workout-Powder-30-Servings-Rocket-Pop_173fc204-5493-4c8f-a7f2-1b5fd4795db3.aaf081828225f780040e8dd7a4b6350d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
        price: 850,
        category: 'Supplements',
        brand: 'Xtend',
        rating: 4,
        reviews: 430,
        servings: 30,
        scoop: 1
      },
      {
        id: 5,
        name: 'Mass Gainer - 5kg',
        image: 'https://www.titaniumsport.rs/wp-content/uploads/2024/01/Mass-Gainer-5000-g.jpeg',
        price: 3200,
        category: 'Supplements',
        badge: 'High Calorie',
        brand: 'Serious Mass',
        rating: 4.5,
        reviews: 900,
        servings: 16,
        scoop: 2,
        proteinPerServing: '50g'
      },
      { id: 6, name: 'Multivitamin for Men - 60 Caps', image: 'https://down-sg.img.susercontent.com/file/sg-11134201-7ra2y-m4u1xn0tnzpca5', price: 600, category: 'Supplements', brand: 'Centrum', rating: 5, reviews: 300 },
      { id: 7, name: 'Fish Oil Omega 3 - 100 Softgels', image: 'https://tse3.mm.bing.net/th/id/OIP.v-6uSrH_pMLY0oD4HYaYWwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 750, category: 'Supplements', brand: 'Now Foods', rating: 4, reviews: 520 },
      { id: 8, name: 'Protein Bar - Chocolate (Box of 12)', image: 'https://tse3.mm.bing.net/th/id/OIP.yn3XbjqNAb1Ypv0tc6cw4gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 840, category: 'Supplements', badge: 'Snack', brand: 'Quest Nutrition', proteinPerServing: '21g' },
      { id: 9, name: '100% Natural Peanut Butter - 1kg', image: 'https://tse2.mm.bing.net/th/id/OIP.I1rSLMLkz94Q02X6CWL0yAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 300, category: 'Nutrition', brand: 'Abu Auf' },
      { id: 10, name: 'Premium Rolled Oats - 1kg', image: 'https://tse3.mm.bing.net/th/id/OIP.J2G3gJbCovc5TjMDxucoFQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 150, category: 'Nutrition', brand: 'Lino' },
      { id: 11, name: 'Premium Medjool Dates - 1kg', image: 'https://tse2.mm.bing.net/th/id/OIP.plOmVptWuYRv7bHeRpJ03AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 400, category: 'Nutrition' },

      // ================= Equipment & Machines =================
      { id: 12, name: 'Adjustable Dumbbells Set - 24kg', image: 'https://fitnero.com/wp-content/uploads/2025/06/FULL-RES-Fitnero-Product-Shoot-May-2025-24-scaled.jpg', price: 4500, category: 'Equipment', badge: 'New', brand: 'Bowflex', rating: 5, reviews: 110 },
      { id: 13, name: 'Resistance Bands Set (5 levels)', image: 'https://i.pinimg.com/originals/22/c7/2f/22c72facc56f4eef493af4ff192c074c.jpg', price: 450, category: 'Equipment', rating: 4, reviews: 85 },
      { id: 14, name: 'Olympic Barbell - 20kg', image: 'https://plusfitness.ng/wp-content/uploads/2025/09/OLYMPIC-BARBELL-BAR1.jpeg', price: 3500, category: 'Equipment', brand: 'Rogue' },
      { id: 15, name: 'Bumper Weight Plates - 10kg (Pair)', image: 'https://directfitnessgear.com.au/cdn/shop/files/10kg_black_bumper_weight_plates_reeplex_pro_paiur_1.png?v=1764828396&width=1024', price: 1800, category: 'Equipment', brand: 'Rogue' },
      { id: 16, name: 'Bumper Weight Plates - 20kg (Pair)', image: 'https://tse4.mm.bing.net/th/id/OIP.J-RDKelGrc6EHYb60JtDEgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 3500, category: 'Equipment', brand: 'Rogue' },
      { id: 17, name: 'Cast Iron Kettlebell - 16kg', image: 'https://contents.mediadecathlon.com/m23555023/k$2b414814150de9b1f2e825d796c90ed8/picture.jpg?format=auto&f=3000x0', price: 1200, category: 'Equipment' },
      { id: 18, name: 'Doorway Pull-Up Bar', image: 'https://i5.walmartimages.com/asr/11403435-1743-4d22-a4be-3dffbd845487.377e4bfd45b95f67692b3b437f24a65e.jpeg', price: 650, category: 'Equipment', rating: 4.5, reviews: 200 },
      { id: 19, name: 'Anti-Slip Yoga Mat', image: 'https://tse1.mm.bing.net/th/id/OIP.uiUaVvXHgMrSgS_8fJ8OJQHaGR?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 350, category: 'Equipment' },
      { id: 20, name: 'Foam Roller for Muscle Recovery', image: 'https://media.diy.com/is/image/KingfisherDigital/kayman-foam-rollers-for-muscles-portable-massage-roller-for-deep-tissue-relief-recovery-foam-roller-for-back-pain-relief~5056475422507_01c_MP?$MOB_PREV$&$width=1200&$height=1200', price: 400, category: 'Equipment' },
      { id: 21, name: 'Adjustable Weight Bench', image: 'https://th.bing.com/th/id/R.30e50add677dc0ef63a5d112800e2a05?rik=BU7GGFrQEzqTrg&riu=http%3a%2f%2fgoplusus.com%2fcdn%2fshop%2ffiles%2fimage_1_10765de8-7e91-4282-a074-58384d98a461.jpg%3fv%3d1697099106&ehk=3Ny932gzha%2bHFEJymJ4lX3Xtm3etnezXg84YerYe5Ns%3d&risl=&pid=ImgRaw&r=0', price: 5500, category: 'Equipment', brand: 'Titan Fitness' },
      { id: 22, name: 'Speed Jump Rope', image: 'https://m.media-amazon.com/images/I/71ahiKpa-zL._AC_SL1500_.jpg', price: 200, category: 'Equipment' },
      { id: 23, name: 'Ab Roller Wheel', image: 'https://m.media-amazon.com/images/I/91zwfM5NDiL._AC_.jpg', price: 300, category: 'Equipment' },

      // ================= Accessories =================
      { id: 24, name: 'Leather Weightlifting Belt', image: 'https://tse4.mm.bing.net/th/id/OIP.LD3FmfcLx8xnaS3e1wdvfQHaHZ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 650, category: 'Accessories', brand: 'RDX', rating: 4.8, reviews: 340 },
      { id: 25, name: 'Premium Shaker Bottle 700ml', image: 'https://bf1af2.akinoncloudcdn.com/products/2025/10/31/622857/c0949465-2d3e-4cf1-b19a-8c43f5d1600b.jpg', price: 250, category: 'Accessories', brand: 'BlenderBottle' },
      { id: 26, name: 'Waterproof Gym Duffle Bag', image: 'https://th.bing.com/th/id/R.043931a741b8fe210c52e7d40c822fc2?rik=nC1LE3EkRpf%2b6g&pid=ImgRaw&r=0', price: 850, category: 'Accessories', brand: 'Nike' },
      { id: 27, name: 'Heavy Duty Lifting Straps (Pair)', image: 'https://i5.walmartimages.com/seo/Heavy-Duty-Lift-Sling-Lifting-Straps-Nylon-Tree-Saver-Recovery-Strap_365478d2-7586-44ed-beb1-55172c31fdaf.06f6158b36ee3a25354a931ee045c700.jpeg', price: 200, category: 'Accessories', brand: 'Harbinger' },
      { id: 28, name: 'Wrist Wraps for Support', image: 'https://m.media-amazon.com/images/I/81swU9BnEzL._AC_SL1500_.jpg', price: 250, category: 'Accessories', brand: 'Gymshark' },
      { id: 29, name: 'Neoprene Knee Sleeves (7mm)', image: 'https://tse4.mm.bing.net/th/id/OIP.9W6NzqyAT8z9EeOkMByvVQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', price: 500, category: 'Accessories', brand: 'SBD' },
      { id: 30, name: 'Microfiber Gym Towel', image: 'https://m.media-amazon.com/images/I/81SZgNyAdIL._AC_SL1500_.jpg', price: 150, category: 'Accessories' },
      { id: 31, name: '2L Water Jug', image: 'https://th.bing.com/th/id/R.2d9b2c0a6ad23253909db7a3e16992e8?rik=IFMxBexa59wo9Q&riu=http%3a%2f%2frukmini1.flixcart.com%2fimage%2f300%2f300%2fxif0q%2fbottle%2fg%2fo%2fe%2f3000-transparent-water-bottle-time-markers-water-jugs-with-straw-original-imah4b9hmxg97nfs.jpeg&ehk=LZUwf7e40i0Qvjw3VU%2b%2fJhGTY3kF8QBI2lkndj%2b4u2s%3d&risl=&pid=ImgRaw&r=0', price: 350, category: 'Accessories' },

      // ================= Apparel =================
      { id: 32, name: 'Fitted Black T-Shirt', image: 'https://th.bing.com/th/id/R.cba79338b25f43de9729d44a0eabb6c6?rik=riL43df5Ho0c7w&riu=http%3a%2f%2fwww.musclefitbasics.com%2fcdn%2fshop%2fproducts%2fblackveenew1_1080x_6370d63c-7b30-44ce-8c3b-8e6bd20e1674.jpg%3fv%3d1591928217&ehk=TpzlDAxoKEyy1cpgLzGIgMf%2b03rxDfmApg5oGyJpNfg%3d&risl=&pid=ImgRaw&r=0', price: 400, category: 'Apparel', brand: 'Under Armour' },
      { id: 33, name: 'Wide-Leg Grey Sweatpants', image: 'https://i5.walmartimages.com/seo/Mohiass-Mens-Wide-Leg-Sweatpants-Open-Bottom-Fleece-Big-and-Tall-Joggers-Trousers-Lounge-Casual-Athletic-Baggy-Pants-with-Pockets-Light-Gray-XL_d81b570d-a644-401c-a4dd-9772a54650f6.2b0366897050a92d1c14797815e58b8f.jpeg', price: 550, category: 'Apparel', brand: 'Nike' },
      { id: 34, name: 'Oversized Gym Hoodie - Black', image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/images-CrestOversizedHoodieBlackA5A8O_BB2J_1124_0492_1200x.jpg?v=1753107227', price: 850, category: 'Apparel', brand: 'Gymshark' },
      { id: 35, name: 'Long Sleeve Compression Shirt', image: 'https://i.pinimg.com/originals/72/db/40/72db40e2e180e31ccd8cb51709452b1c.jpg', price: 600, category: 'Apparel', brand: 'Under Armour' },
      { id: 36, name: 'Quick Dry Gym Shorts', image: 'https://i5.walmartimages.com/seo/cllios-Mens-Sweat-Shorts-5-Inch-Quick-Dry-Athletic-Gym-Shorts-Classic-Solid-Bodybuilding-Short-Pants-Slim-Fit-Elastic-Waist-Drawstring-Sports-Shorts_1738e17c-1353-4bee-b1af-13855a193349.36ea19854f14e9b0d110134f9955d358.jpeg', price: 450, category: 'Apparel', brand: 'Adidas' },
      { id: 37, name: 'Sleeveless Tank Top - White', image: 'https://m.media-amazon.com/images/I/71us8G-JzHS._AC_UL1500_.jpg', price: 350, category: 'Apparel' }
    ];
  }

  // دالة تحويل التقييم (الرقم) إلى مصفوفة من النجوم الممتلئة والفارغة (True/False)
  // هذه الدالة تم استخدامها في ملف الـ HTML لديك
  getStars(rating: number): boolean[] {
    const maxStars = 5;
    const filledStars = Math.round(rating); // تقريب التقييم لأقرب رقم صحيح
    return Array.from({ length: maxStars }, (_, i) => i < filledStars);
  }

  onBuy(item: product) {
    console.log('Buy:', item);
  }

  onViewDetails(item: product) {
    console.log('View details:', item);
  }
}