import React, { useEffect } from 'react';

// This component doesn't render anything but sets up placeholder images
// when the app first loads
function PlaceholderImages() {
  useEffect(() => {
    // Create placeholder images for menu items if they don't exist
    const menuItems = [
      { id: 1, name: 'samosa', color: '#F59E0B' },
      { id: 2, name: 'sandwich', color: '#10B981' },
      { id: 3, name: 'chicken-curry', color: '#EF4444' },
      { id: 4, name: 'paneer-masala', color: '#EC4899' },
      { id: 5, name: 'masala-chai', color: '#8B5CF6' },
      { id: 6, name: 'cold-coffee', color: '#6366F1' },
      { id: 7, name: 'french-fries', color: '#F59E0B' },
      { id: 8, name: 'veg-biryani', color: '#10B981' },
      { id: 9, name: 'lime-soda', color: '#34D399' },
      { id: 10, name: 'spring-rolls', color: '#F97316' },
      { id: 11, name: 'butter-chicken', color: '#EF4444' },
      { id: 12, name: 'mango-shake', color: '#F59E0B' }
    ];

    // Generate SVG placeholders for menu items
    menuItems.forEach(item => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
          <rect width="300" height="200" fill="${item.color}" />
          <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
            ${item.name.replace('-', ' ')}
          </text>
        </svg>
      `;
      
      // Convert SVG to data URL
      const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
      
      // Store in localStorage to simulate images
      localStorage.setItem(`placeholder_image_${item.name}`, dataUrl);
    });
  }, []);

  return null;
}

export default PlaceholderImages;
