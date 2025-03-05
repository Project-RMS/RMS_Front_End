

import { FaPlus, FaChevronDown, FaChevronUp, FaUtensils, FaCoffee, FaPizzaSlice, FaBreadSlice, FaSoap, FaPrint } from "react-icons/fa";
import { GiHamburger, GiTacos, GiChickenLeg } from "react-icons/gi";


// Interfaces
interface MenuItem {
    id: string;
    name: string;
    price?: number;
    category: string;
    quantity?: number;
    status?: 'pending' | 'in-progress' | 'ready';
}
interface FavoriteCategory {
    id: string;
    name: string;
    items: MenuItem[];
    icon?: JSX.Element;
}
export const initialCategories: FavoriteCategory[] = [
  // ... (unchanged initialCategories from your original code)
  {
    id: "cat1", name: "Drinks", icon: <FaCoffee size={16} />, items: [
      { id: "1", name: "Coffee", price: 3.99, category: "Drinks" },
      { id: "2", name: "Tea", price: 2.99, category: "Drinks" },
    ]
  },
  {
    id: "cat2", name: "Food", icon: <GiHamburger size={16} />, items: [
      { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
      { id: "4", name: "Salad", price: 5.99, category: "Food" },
    ]
  },
  {
    id: "cat3", name: "Starters", icon: <FaUtensils size={16} />, items: [
      { id: "5", name: "Spring Rolls", price: 4.99, category: "Starters" },
      { id: "6", name: "Garlic Bread", price: 3.99, category: "Starters" },
    ]
  },
  {
    id: "cat4", name: "Pizza", icon: <FaPizzaSlice size={16} />, items: [
      { id: "7", name: "Margherita", price: 9.99, category: "Pizza" },
      { id: "8", name: "Pepperoni", price: 10.99, category: "Pizza" },
    ]
  },
  {
    id: "cat5", name: "Soups", icon: <FaSoap size={16} />, items: [
      { id: "9", name: "Tomato Soup", price: 4.29, category: "Soups" },
      { id: "10", name: "Chicken Noodle", price: 5.29, category: "Soups" },
    ]
  },
  {
    id: "cat6", name: "Chicken Soup", icon: <GiChickenLeg size={16} />, items: [
      { id: "11", name: "Creamy Chicken", price: 5.49, category: "Chicken Soup" },
      { id: "12", name: "Spicy Chicken", price: 5.99, category: "Chicken Soup" },
    ]
  },
  {
    id: "cat7", name: "Indian Breads", icon: <FaBreadSlice size={16} />, items: [
      { id: "13", name: "Naan", price: 2.99, category: "Indian Breads" },
      { id: "14", name: "Paratha", price: 3.49, category: "Indian Breads" },
    ]
  },
  {
    id: "cat8", name: "Roti", icon: <FaBreadSlice size={16} />, items: [
      { id: "15", name: "Plain Roti", price: 2.49, category: "Roti" },
      { id: "16", name: "Butter Roti", price: 2.79, category: "Roti" },
    ]
  },
  {
    id: "cat9", name: "South India", icon: <GiTacos size={16} />, items: [
      { id: "17", name: "Dosa", price: 8.99, category: "South India" },
      { id: "18", name: "Idli", price: 6.49, category: "South India" },
    ]
  },
];