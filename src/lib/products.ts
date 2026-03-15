import { Product, CATEGORIES, BRANDS } from "./types";

const productImages: Record<string, string[]> = {
  electronics: [
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
  ],
  fashion: [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
  ],
  "home-appliances": [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400",
  ],
  beauty: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
  ],
  sports: [
    "https://images.unsplash.com/photo-1461896836934-bbe910bba2e6?w=400",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400",
  ],
  books: [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  ],
  toys: [
    "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400",
    "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  ],
  automotive: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
  ],
  gaming: [
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400",
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400",
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
  ],
};

const adjectives = ["Premium", "Pro", "Ultra", "Elite", "Classic", "Signature", "Advanced", "Essential", "Deluxe", "Compact"];
const suffixes = ["Edition", "Series", "Collection", "Line", "Max", "Plus", "X", "V2", "SE", "Lite"];

// Seeded random for consistency
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateProduct(id: number): Product {
  const catIndex = id % CATEGORIES.length;
  const cat = CATEGORIES[catIndex];
  const brand = BRANDS[id % BRANDS.length];
  const adj = adjectives[Math.floor(seededRandom(id * 3) * adjectives.length)];
  const suffix = suffixes[Math.floor(seededRandom(id * 7) * suffixes.length)];
  const imgs = productImages[cat.slug] || productImages.electronics;
  const img = imgs[id % imgs.length];

  const basePrice = 10 + seededRandom(id * 13) * 990;
  const discount = seededRandom(id * 17) > 0.6 ? Math.floor(seededRandom(id * 19) * 40) + 5 : 0;

  return {
    id,
    title: `${brand} ${adj} ${cat.name.slice(0, -1)} ${suffix}`,
    description: `Experience the ${adj.toLowerCase()} quality of this ${cat.name.toLowerCase()} product from ${brand}. Designed for performance and built to last with cutting-edge technology and premium materials.`,
    price: Math.round(basePrice * 100) / 100,
    discountPercentage: discount,
    rating: Math.round((3 + seededRandom(id * 23) * 2) * 10) / 10,
    brand,
    category: cat.slug,
    thumbnail: img,
    images: [img, ...imgs.filter((i) => i !== img).slice(0, 2)],
  };
}

export function getProducts(page: number, limit: number, filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  brand?: string;
  search?: string;
  sort?: string;
}): { products: Product[]; total: number } {
  const totalProducts = 10000;
  let filtered: Product[] = [];
  
  for (let i = 1; i <= totalProducts; i++) {
    const p = generateProduct(i);
    if (filters?.category && p.category !== filters.category) continue;
    if (filters?.minPrice && p.price < filters.minPrice) continue;
    if (filters?.maxPrice && p.price > filters.maxPrice) continue;
    if (filters?.minRating && p.rating < filters.minRating) continue;
    if (filters?.brand && p.brand !== filters.brand) continue;
    if (filters?.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) continue;
    filtered.push(p);
  }

  if (filters?.sort) {
    switch (filters.sort) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      case "discount": filtered.sort((a, b) => b.discountPercentage - a.discountPercentage); break;
    }
  }

  const start = (page - 1) * limit;
  return {
    products: filtered.slice(start, start + limit),
    total: filtered.length,
  };
}

export function getProductById(id: number): Product | undefined {
  if (id < 1 || id > 10000) return undefined;
  return generateProduct(id);
}

export function getFeaturedProducts(): Product[] {
  return [1, 15, 28, 42, 55, 67, 83, 99].map(generateProduct);
}

export function getTrendingProducts(): Product[] {
  return [101, 215, 328, 442, 555, 667, 783, 899].map(generateProduct);
}

export function getDealsOfTheDay(): Product[] {
  // Products with high discounts
  const deals: Product[] = [];
  for (let i = 1; i <= 200 && deals.length < 8; i++) {
    const p = generateProduct(i);
    if (p.discountPercentage >= 20) deals.push(p);
  }
  return deals;
}
