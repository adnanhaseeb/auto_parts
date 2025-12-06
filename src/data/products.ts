export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories?: { name: string; slug: string }[];
}

export const categories: Category[] = [
  {
    id: "1",
    name: "LED & Lightening",
    slug: "led-lightening",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Headlights / Headlamps", slug: "headlights" },
      { name: "Backlights / Backlamps", slug: "backlights" },
      { name: "HID & LED Bulbs", slug: "hid-led-bulbs" },
      { name: "LED Bar Lights", slug: "led-bar-lights" },
      { name: "Strip Lights", slug: "strip-lights" },
    ],
  },
  {
    id: "2",
    name: "Exterior",
    slug: "exterior",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Air Press & Sunvisors", slug: "air-press" },
      { name: "Bumper Protectors", slug: "bumper-protectors" },
      { name: "Chrome Accessories", slug: "chrome-accessories" },
      { name: "Door Guards", slug: "door-guards" },
    ],
  },
  {
    id: "3",
    name: "Interior",
    slug: "interior",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Seat Covers", slug: "seat-covers" },
      { name: "Dashboard Accessories", slug: "dashboard" },
      { name: "Steering Wheel Covers", slug: "steering-covers" },
      { name: "Floor Mats", slug: "floor-mats" },
    ],
  },
  {
    id: "4",
    name: "Car Care",
    slug: "car-care",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Car Polish & Wax", slug: "polish-wax" },
      { name: "Car Shampoos", slug: "shampoos" },
      { name: "Interior Cleaners", slug: "interior-cleaners" },
    ],
  },
  {
    id: "5",
    name: "Modifications",
    slug: "modifications",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Body Kits", slug: "body-kits" },
      { name: "Spoilers", slug: "spoilers" },
      { name: "Performance Parts", slug: "performance-parts" },
    ],
  },
  {
    id: "6",
    name: "Gadgets",
    slug: "gadgets",
    image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Dash Cameras", slug: "dash-cameras" },
      { name: "GPS Trackers", slug: "gps-trackers" },
      { name: "Car Chargers", slug: "car-chargers" },
    ],
  },
  {
    id: "7",
    name: "Paint Protection Film",
    slug: "ppf",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop",
  },
  {
    id: "8",
    name: "Performance",
    slug: "performance",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=200&h=200&fit=crop",
  },
  {
    id: "9",
    name: "Wheel",
    slug: "wheel",
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=200&h=200&fit=crop",
  },
  {
    id: "10",
    name: "Auto Spare Parts",
    slug: "auto-spare-parts",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "18W Underwater LED Lamp With 6 Beads Pair - Car Headlights Strip Lamp Halogen Bulb",
    price: 800,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "led-lightening",
    inStock: true,
  },
  {
    id: "2",
    name: "9d Mats For Grass Clip - Each",
    price: 50,
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=400&fit=crop",
    category: "interior",
    inStock: true,
  },
  {
    id: "3",
    name: "Android LCD PCB Kit Replacement Part",
    price: 6000,
    image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=400&fit=crop",
    category: "gadgets",
    inStock: true,
  },
  {
    id: "4",
    name: "Daihatsu Cuore OEM Plastic Front Bumper 1 Pc 2002 - 2012",
    price: 4200,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop",
    category: "auto-spare-parts",
    inStock: true,
  },
  {
    id: "5",
    name: "Honda City Back Lamp Lens Cover Left Side",
    price: 1500,
    originalPrice: 1800,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=400&fit=crop",
    category: "led-lightening",
    inStock: true,
    isSale: true,
  },
  {
    id: "6",
    name: "Premium Leather Seat Cover Set - Black",
    price: 15000,
    originalPrice: 18000,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop",
    category: "interior",
    inStock: true,
    isSale: true,
  },
  {
    id: "7",
    name: "Ceramic Coating Kit - Professional Grade",
    price: 8500,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=400&fit=crop",
    category: "car-care",
    inStock: true,
    isNew: true,
  },
  {
    id: "8",
    name: "Carbon Fiber Side Mirror Covers - Pair",
    price: 3200,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=400&fit=crop",
    category: "exterior",
    inStock: true,
  },
  {
    id: "9",
    name: "4K Dash Camera with GPS",
    price: 12000,
    originalPrice: 15000,
    image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=400&fit=crop",
    category: "gadgets",
    inStock: true,
    isSale: true,
  },
  {
    id: "10",
    name: "Alloy Wheel Set 17 inch - Set of 4",
    price: 45000,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=400&h=400&fit=crop",
    category: "wheel",
    inStock: true,
    isNew: true,
  },
  {
    id: "11",
    name: "LED Headlight Bulb H4 - Pair",
    price: 2500,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "led-lightening",
    inStock: true,
  },
  {
    id: "12",
    name: "Car Floor Mat 5D - Universal",
    price: 5500,
    originalPrice: 6500,
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=400&fit=crop",
    category: "interior",
    inStock: false,
    isSale: true,
  },
];