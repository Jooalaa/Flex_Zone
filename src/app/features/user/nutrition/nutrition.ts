import { Footer } from './../../../components/footer/footer';
import { Component } from '@angular/core';

export interface NutritionPlan {
  icon: string;
  title: string;
  description: string;
  calories: number;
  protein: { amount: string; percentage: string };
  carbs: { amount: string; percentage: string };
  fats: { amount: string; percentage: string };
  mealPlan: Meal[];
}

export interface FoodItem {
  icon: string;
  name: string;
  serving: string;
  calories: number;
  protein: string;
}

export interface Meal {
  name: string;
  icon: string;
  totalCalories: number;
  items: FoodItem[];
}

export type FoodCategory = 'Protein' | 'Carbs' | 'Fats' | 'Fruits' | 'Veggies';

export interface FoodLibraryItem {
  icon: string;
  name: string;
  serving: string;
  category: FoodCategory;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
}

@Component({
  imports: [Footer],
  selector: 'app-nutrition',
  styleUrl: './nutrition.css',
  templateUrl: './nutrition.html',
})
export class Nutrition {
  // ============ Nutrition Planner ============
goalsList: NutritionPlan[] = [
    {
      icon: '🔥', title: 'Lose Weight', description: 'Calorie deficit, high protein',
      calories: 1800,
      protein: { amount: '150g', percentage: '33%' },
      carbs: { amount: '180g', percentage: '40%' },
      fats: { amount: '55g', percentage: '28%' },
      mealPlan: [
        {
          name: 'Breakfast', icon: '🌅', totalCalories: 305,
          items: [
            { icon: '🥚', name: 'Whole Eggs', serving: '2 eggs', calories: 155, protein: '13g' },
            { icon: '🥣', name: 'Oatmeal', serving: '1 cup', calories: 150, protein: '5g' }
          ]
        },
        {
          name: 'Lunch', icon: '🍽️', totalCalories: 185,
          items: [
            { icon: '🐟', name: 'Tuna Can', serving: '1 can', calories: 130, protein: '28g' },
            { icon: '🥦', name: 'Broccoli', serving: '1 cup', calories: 55, protein: '4g' }
          ]
        },
        {
          name: 'Snack', icon: '🥤', totalCalories: 150,
          items: [
            { icon: '🍎', name: 'Apple', serving: '1 medium', calories: 95, protein: '0g' },
            { icon: '🥜', name: 'Almonds', serving: '10 nuts', calories: 55, protein: '2g' }
          ]
        },
        {
          name: 'Dinner', icon: '🌙', totalCalories: 350,
          items: [
            { icon: '🥗', name: 'Mixed Salad', serving: '1 large bowl', calories: 100, protein: '5g' },
            { icon: '🐟', name: 'White Fish', serving: '150g', calories: 250, protein: '30g' }
          ]
        }
      ]
    },
    {
      icon: '💪', title: 'Build Muscle', description: 'Calorie surplus, max protein',
      calories: 2800,
      protein: { amount: '200g', percentage: '30%' },
      carbs: { amount: '350g', percentage: '50%' },
      fats: { amount: '70g', percentage: '20%' },
      mealPlan: [
        {
          name: 'Breakfast', icon: '🌅', totalCalories: 550,
          items: [
            { icon: '🥚', name: 'Whole Eggs & Whites', serving: '4 eggs', calories: 250, protein: '25g' },
            { icon: '🥛', name: 'Protein Shake', serving: '1 scoop', calories: 120, protein: '25g' },
            { icon: '🍞', name: 'Whole Wheat Toast', serving: '2 slices', calories: 180, protein: '8g' }
          ]
        },
        {
          name: 'Lunch', icon: '🍽️', totalCalories: 650,
          items: [
            { icon: '🍗', name: 'Chicken Breast', serving: '200g', calories: 330, protein: '62g' },
            { icon: '🍚', name: 'White Rice', serving: '1.5 cups', calories: 320, protein: '6g' }
          ]
        },
        {
          name: 'Snack', icon: '🥤', totalCalories: 400,
          items: [
            { icon: '🥪', name: 'Peanut Butter Sandwich', serving: '1 sandwich', calories: 300, protein: '12g' },
            { icon: '🥛', name: 'Milk', serving: '1 glass', calories: 100, protein: '8g' }
          ]
        },
        {
          name: 'Dinner', icon: '🌙', totalCalories: 600,
          items: [
            { icon: '🥩', name: 'Lean Beef', serving: '200g', calories: 400, protein: '50g' },
            { icon: '🥔', name: 'Baked Potato', serving: '1 large', calories: 200, protein: '5g' }
          ]
        }
      ]
    },
    {
      icon: '⚖️', title: 'Stay Fit', description: 'Balanced macros',
      calories: 2200,
      protein: { amount: '160g', percentage: '30%' },
      carbs: { amount: '250g', percentage: '45%' },
      fats: { amount: '60g', percentage: '25%' },
      mealPlan: [
        {
          name: 'Breakfast', icon: '🌅', totalCalories: 394,
          items: [
            { icon: '🥚', name: 'Whole Eggs', serving: '2 eggs', calories: 155, protein: '13g' },
            { icon: '🥣', name: 'Oatmeal', serving: '1 cup', calories: 150, protein: '5g' },
            { icon: '🍌', name: 'Banana', serving: '1 medium', calories: 89, protein: '1g' }
          ]
        },
        {
          name: 'Lunch', icon: '🍽️', totalCalories: 323,
          items: [
            { icon: '🍗', name: 'Grilled Chicken Breast', serving: '100g', calories: 165, protein: '31g' },
            { icon: '🍠', name: 'Sweet Potato', serving: '1 medium', calories: 103, protein: '2g' },
            { icon: '🥦', name: 'Broccoli', serving: '1 cup', calories: 55, protein: '4g' }
          ]
        },
        {
          name: 'Snack', icon: '🥤', totalCalories: 189,
          items: [
            { icon: '🥛', name: 'Greek Yogurt', serving: '170g', calories: 100, protein: '17g' },
            { icon: '🍌', name: 'Banana', serving: '1 medium', calories: 89, protein: '1g' }
          ]
        },
        {
          name: 'Dinner', icon: '🌙', totalCalories: 479,
          items: [
            { icon: '🐟', name: 'Salmon Fillet', serving: '100g', calories: 208, protein: '20g' },
            { icon: '🍚', name: 'Brown Rice', serving: '1 cup', calories: 216, protein: '5g' },
            { icon: '🥦', name: 'Broccoli', serving: '1 cup', calories: 55, protein: '4g' }
          ]
        }
      ]
    }
  ];

  selectedGoal: NutritionPlan = this.goalsList[0];

  selectGoal(goal: NutritionPlan) {
    this.selectedGoal = goal;
  }

  // ============ Food Library ============
  categories: string[] = ['All', 'Protein', 'Carbs', 'Fats', 'Fruits', 'Veggies'];
  selectedCategory: string = 'All';

  foodItems: FoodLibraryItem[] = [
    { icon: '🍗', name: 'Grilled Chicken Breast', serving: 'per 100g', category: 'Protein', calories: 165, protein: '31g', carbs: '0g', fats: '3.6g' },
    { icon: '🍚', name: 'Brown Rice', serving: 'per 1 cup', category: 'Carbs', calories: 216, protein: '5g', carbs: '45g', fats: '1.8g' },
    { icon: '🥚', name: 'Whole Eggs', serving: 'per 2 eggs', category: 'Protein', calories: 155, protein: '13g', carbs: '1g', fats: '11g' },
    { icon: '🥣', name: 'Oatmeal', serving: 'per 1 cup', category: 'Carbs', calories: 150, protein: '5g', carbs: '27g', fats: '3g' },
    { icon: '🐟', name: 'Salmon Fillet', serving: 'per 100g', category: 'Protein', calories: 208, protein: '20g', carbs: '0g', fats: '13g' },
    { icon: '🍠', name: 'Sweet Potato', serving: 'per 1 medium', category: 'Carbs', calories: 103, protein: '2g', carbs: '24g', fats: '0.1g' },
    { icon: '🥜', name: 'Almonds', serving: 'per 30g', category: 'Fats', calories: 164, protein: '6g', carbs: '6g', fats: '14g' },
    { icon: '🥛', name: 'Greek Yogurt', serving: 'per 170g', category: 'Protein', calories: 100, protein: '17g', carbs: '6g', fats: '0.7g' },
    { icon: '🍌', name: 'Banana', serving: 'per 1 medium', category: 'Fruits', calories: 89, protein: '1g', carbs: '23g', fats: '0.3g' },
    { icon: '🥑', name: 'Avocado', serving: 'per 1/2 fruit', category: 'Fats', calories: 120, protein: '1.5g', carbs: '6g', fats: '11g' },
    { icon: '🥤', name: 'Protein Shake', serving: 'per 1 scoop', category: 'Protein', calories: 120, protein: '25g', carbs: '3g', fats: '1g' },
    { icon: '🥦', name: 'Broccoli', serving: 'per 1 cup', category: 'Veggies', calories: 55, protein: '4g', carbs: '11g', fats: '0.6g' },
    { icon: '🍎', name: 'Apple', serving: 'per 1 medium', category: 'Fruits', calories: 95, protein: '0g', carbs: '25g', fats: '0.3g' },
    { icon: '🥬', name: 'Spinach', serving: 'per 1 cup', category: 'Veggies', calories: 7, protein: '1g', carbs: '1g', fats: '0.1g' },
  ];

  get filteredItems(): FoodLibraryItem[] {
    if (this.selectedCategory === 'All') {
      return this.foodItems;
    }
    return this.foodItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}