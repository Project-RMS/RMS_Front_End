// src/types/staff.ts
export interface StaffMember {
    id: number;
    name: string;
    role: 'Chef' | 'Waiter' | 'Manager' | 'Cleaner';
    status: 'Active' | 'Inactive';
}

export interface NewStaffForm {
    name: string;
    role: 'Chef' | 'Waiter' | 'Manager' | 'Cleaner';
}


// Orders : 
export interface MenuItem {
    id: number;
    name: string;
    category: 'veg' | 'non-veg' | 'soft-drink';
    price: number;
    icon: string; // For emojis or icons
}

export interface Order {
    id: number;
    items: MenuItem[];
    status: 'pending' | 'cooking' | 'served';
    total: number;
    timestamp: string;
}






export const menu: MenuItem[] = [
    // Vegetarian with Symbols
    { id: 1, name: 'Margherita Pizza 🍕', price: 12.99, category: 'veg', icon: '🍕' },
    { id: 2, name: 'Paneer Tikka 🌶️', price: 10.49, category: 'veg', icon: '🌶️' },
    { id: 3, name: 'Vegetable Stir Fry 🥕', price: 9.99, category: 'veg', icon: '🥕' },
    { id: 4, name: 'Mushroom Risotto 🍄', price: 13.99, category: 'veg', icon: '🍄' },
    { id: 5, name: 'Caprese Salad 🥗', price: 8.49, category: 'veg', icon: '🥗' },
    // Non-Vegetarian with icons
    { id: 6, name: 'Grilled Chicken 🍗', price: 15.99, category: 'non-veg', icon: '🍗' },
    { id: 7, name: 'Fish & Chips 🐟', price: 14.49, category: 'non-veg', icon: '🐟' },
    { id: 8, name: 'Beef Burger 🍔', price: 11.99, category: 'non-veg', icon: '🍔' },
    { id: 9, name: 'Lamb Curry 🍖', price: 16.99, category: 'non-veg', icon: '🍖' },
    { id: 10, name: 'Shrimp Pasta 🍤', price: 17.49, category: 'non-veg', icon: '🍤' },
    // Soft Drinks with icons
    { id: 11, name: 'Cola 🥤', price: 2.99, category: 'soft-drink', icon: '🥤' },
    { id: 12, name: 'Lemonade 🍋', price: 3.49, category: 'soft-drink', icon: '🍋' },
    { id: 13, name: 'Iced Tea 🍹', price: 3.29, category: 'soft-drink', icon: '🍹' },
    { id: 14, name: 'Orange Juice 🍊', price: 4.49, category: 'soft-drink', icon: '🍊' },
    { id: 15, name: 'Sparkling Water 💧', price: 2.79, category: 'soft-drink', icon: '💧' },
];




export interface Table {
    id: number;
    name: string;
    status: "available" | "occupied" | "reserved";
    seats: number;
  }
  
  export interface TableCategory {
    id: number;
    name: string;
    tables: Table[];
  }
// Types for menu items and favorite categories
interface MenuItems {
    name: string;
    price?: number; // Optional: Add more properties as needed
  }
  
  interface FavoriteItem {
    name: string;
    items: MenuItem[];
  }
  
  // Sample data for favorite items
 export const favoriteItems: FavoriteItem[] = [
    { name: "Starters", items: [{
        name: "Spring Rolls", price: 5,
        id: 0,
        category: "veg",
        icon: ""
    }, 
        {
            name: "Garlic Bread", price: 4,
            id: 0,
            category: "veg",
            icon: ""
        }] },
    { name: "Soups", items: [{
        name: "Tomato Soup", price: 3,
        id: 0,
        category: "veg",
        icon: ""
    }, {
        name: "Chicken Soup", price: 4,
        id: 0,
        category: "veg",
        icon: ""
    }] },
    { name: "Indian Breads", items: [{
        name: "Naan", price: 2,
        id: 0,
        category: "veg",
        icon: ""
    }, {
        name: "Roti", price: 1.5,
        id: 0,
        category: "veg",
        icon: ""
    }] },
    { name: "Meat Boxes", items: [{
        name: "Chicken Box", price: 10,
        id: 0,
        category: "veg",
        icon: ""
    }, {
        name: "Beef Box", price: 12,
        id: 0,
        category: "veg",
        icon: ""
    }] },
    { name: "Pizza", items: [{
        name: "Margherita", price: 8,
        id: 0,
        category: "veg",
        icon: ""
    }, {
        name: "Pepperoni", price: 9,
        id: 0,
        category: "veg",
        icon: ""
    }] },
    { name: "South India", items: [{
        name: "Dosa", price: 6,
        id: 0,
        category: "veg",
        icon: ""
    }, {
        name: "Idli", price: 5,
        id: 0,
        category: "veg",
        icon: ""
    }] },
    { name: "Ice Cream", items: [{
        name: "Vanilla", price: 3,
        id: 0,
        category: "veg",
        icon: ""
    }, {
        name: "Chocolate", price: 3.5,
        id: 0,
        category: "veg",
        icon: ""
    }] },
    { name: "Beverages", items: [{
        name: "Coke", price: 2,
        id: 0,
        category: "veg",
        icon: ""
    }, {
        name: "Sprite", price: 2,
        id: 0,
        category: "veg",
        icon: ""
    }] },
    { name: "Liqueurs", items: [{
        name: "Whiskey", price: 15,
        id: 0,
        category: "veg",
        icon: ""
    }, {
        name: "Vodka", price: 14,
        id: 0,
        category: "veg",
        icon: ""
    }] },
  ];