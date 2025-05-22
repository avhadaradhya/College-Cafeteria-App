// Sample cafeteria menu items with categories and details.
// This function gets placeholder images from localStorage or falls back to a color
const getPlaceholderImage = (name) => {
  // Try to get from localStorage first
  const storedImage = localStorage.getItem(`placeholder_image_${name}`);
  if (storedImage) return storedImage;
  
  // Fallback to a colored placeholder with the name
  const colors = {
    'samosa': '#F59E0B',
    'sandwich': '#10B981',
    'chicken-curry': '#EF4444',
    'paneer-masala': '#EC4899',
    'masala-chai': '#8B5CF6',
    'cold-coffee': '#6366F1',
    'french-fries': '#F59E0B',
    'veg-biryani': '#10B981',
    'lime-soda': '#34D399',
    'spring-rolls': '#F97316',
    'butter-chicken': '#EF4444',
    'mango-shake': '#F59E0B'
  };
  
  const color = colors[name] || '#6B7280';
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='${color}' /%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${name.replace('-', ' ')}%3C/text%3E%3C/svg%3E`;
};

export const menuItems = [
  { id: 1, category: "Snacks", name: "Crispy Samosa", description: "Potato & pea stuffed pastry", price: 30, image: getPlaceholderImage('samosa'), veg: true },
  { id: 2, category: "Snacks", name: "Veg Sandwich", description: "Grilled veggies & cheese", price: 50, image: getPlaceholderImage('sandwich'), veg: true },
  { id: 3, category: "Main Course", name: "Chicken Curry", description: "Spicy curry with steamed rice", price: 120, image: getPlaceholderImage('chicken-curry'), veg: false },
  { id: 4, category: "Main Course", name: "Paneer Butter Masala", description: "Creamy cottage cheese curry", price: 110, image: getPlaceholderImage('paneer-masala'), veg: true },
  { id: 5, category: "Beverages", name: "Masala Chai", description: "Hot spiced Indian tea", price: 20, image: getPlaceholderImage('masala-chai'), veg: true },
  { id: 6, category: "Beverages", name: "Cold Coffee", description: "Iced sweetened coffee", price: 40, image: getPlaceholderImage('cold-coffee'), veg: true },
  { id: 7, category: "Snacks", name: "French Fries", description: "Crispy potato fries with ketchup", price: 60, image: getPlaceholderImage('french-fries'), veg: true },
  { id: 8, category: "Main Course", name: "Veg Biryani", description: "Fragrant rice with mixed vegetables", price: 100, image: getPlaceholderImage('veg-biryani'), veg: true },
  { id: 9, category: "Beverages", name: "Fresh Lime Soda", description: "Refreshing lime soda with mint", price: 35, image: getPlaceholderImage('lime-soda'), veg: true },
  { id: 10, category: "Snacks", name: "Spring Rolls", description: "Crispy vegetable filled rolls", price: 45, image: getPlaceholderImage('spring-rolls'), veg: true },
  { id: 11, category: "Main Course", name: "Butter Chicken", description: "Creamy tomato chicken curry", price: 130, image: getPlaceholderImage('butter-chicken'), veg: false },
  { id: 12, category: "Beverages", name: "Mango Shake", description: "Fresh mango milkshake", price: 50, image: getPlaceholderImage('mango-shake'), veg: true }
];
