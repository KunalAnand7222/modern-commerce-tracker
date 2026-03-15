export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { name: "Electronics", slug: "electronics", icon: "💻", count: 1200 },
  { name: "Fashion", slug: "fashion", icon: "👗", count: 1500 },
  { name: "Home Appliances", slug: "home-appliances", icon: "🏠", count: 800 },
  { name: "Beauty", slug: "beauty", icon: "💄", count: 900 },
  { name: "Sports", slug: "sports", icon: "⚽", count: 700 },
  { name: "Books", slug: "books", icon: "📚", count: 1100 },
  { name: "Toys", slug: "toys", icon: "🧸", count: 600 },
  { name: "Accessories", slug: "accessories", icon: "⌚", count: 1000 },
  { name: "Automotive", slug: "automotive", icon: "🚗", count: 500 },
  { name: "Gaming", slug: "gaming", icon: "🎮", count: 1700 },
];

export const BRANDS = [
  "Apple", "Samsung", "Sony", "Nike", "Adidas", "LG", "Dell", "HP",
  "Asus", "Lenovo", "Razer", "Corsair", "Logitech", "Bose", "JBL",
  "Canon", "Dyson", "Philips", "Bosch", "Xiaomi"
];
