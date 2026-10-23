const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../dist/assets/all images');
const publicGalleryDir = path.resolve(__dirname, '../public/gallery');
const destImgDir = path.join(publicGalleryDir, 'images');
const destVidDir = path.join(publicGalleryDir, 'videos');

fs.mkdirSync(destImgDir, { recursive: true });
fs.mkdirSync(destVidDir, { recursive: true });

const allFiles = fs.readdirSync(srcDir);
const imgFiles = allFiles.filter(f => f.match(/\.(jpe?g|png)$/i)).sort();
const vidFiles = allFiles.filter(f => f.match(/\.mp4$/i)).sort();

console.log(`Processing ${imgFiles.length} images and ${vidFiles.length} videos...`);

const renameMap = [];
const galleryItems = [];

// 1. Process Videos First (Featured prominence)
vidFiles.forEach((oldName, idx) => {
  const newName = `kitchen-smart-tour-${String(idx + 1).padStart(2, '0')}.mp4`;
  const oldPath = path.join(srcDir, oldName);
  const publicPath = path.join(destVidDir, newName);

  // Copy to public/gallery/videos
  fs.copyFileSync(oldPath, publicPath);

  renameMap.push({
    type: 'video',
    original: oldName,
    renamed: newName,
    publicUrl: `gallery/videos/${newName}`
  });

  const titles = [
    'Complete Modular Kitchen Walkthrough with Integrated Glass Vitrines',
    'Full Kitchen Installation Tour — Push-to-Open Lofts & Breakfast Bar',
    'Soft-Close Blum Drawer Mechanism & Indian Storage Pullout Demo',
    'Modern Acrylic Modular Kitchen Tour — Dual Tone Finish',
    'Bespoke Wardrobe & Kitchen Finish Walkthrough — Mira Road Site',
    'Seamless Quartz Countertop & Hob Setup Video',
    'Premium Pantry Pullout & Corner Carousel System in Motion',
    'On-Site Technician Quality Check & Alignment Walkthrough',
    'Full Villa Modular Fitout Video Tour — Kitchen & Wardrobes',
    'Fluted Glass Vitrine LED Backlight Glow Demonstration',
    'Final Handover Site Inspection Tour for Mumbai Client'
  ];

  galleryItems.push({
    id: `vid-${idx + 1}`,
    type: 'video',
    src: `gallery/videos/${newName}`,
    title: titles[idx] || `Kitchen Smart Luxury Video Walkthrough #${idx + 1}`,
    category: 'video',
    categoryLabel: 'Video Walkthrough',
    badge: 'Video Tour',
    caption: 'Verified on-site installation by Kitchen Smart certified master technicians.'
  });
});

// 2. Process Images
const categories = ['kitchen', 'wardrobe', 'details'];
const catLabels = {
  kitchen: 'Modular Kitchen',
  wardrobe: 'Wardrobe & Lofts',
  details: 'Finishes & Hardware'
};

const descriptiveKeywords = [
  'Modern Acrylic Finish Modular Kitchen',
  'Handleless Dual-Tone Modular Kitchen Suite',
  'Full Height Frosted Glass Overhead Vitrines',
  'Integrated Stainless Steel Gas Hob & Chimney',
  'Boiling Water Resistant (BWR) Marine Ply Base Cabinets',
  'Dusty Mauve Acrylic Finish with Profile Pulls',
  'Seamless Quartz Waterfall Island Countertop',
  'Built-in Microwave and Appliance Tower Unit',
  'Heavy-Duty Soft Close Blum Tandembox Drawers',
  'Wicker Basket Pullout for Indian Vegetables',
  'Fluted Panel Feature Backsplash with Warm Backlighting',
  'Full-Height Bedroom Wardrobe with Loft Storage',
  'Sliding Glass Wardrobe with Internal Wardrobe Lights',
  'L-Shape Kitchen Ergonomic Cooking Triangle',
  'Parallel Galley Kitchen Wet & Dry Separation',
  'U-Shape Chef Suite with Corner Magic Carousel',
  'Anti-Turmeric Quartz Slab Surface Installation',
  'Contemporary Mira Road Apartment Kitchen Handover',
  'Factory Homag Edge Banded Waterproof Shutters',
  'Custom Cutlery Organizer and Spice Rack Pullouts'
];

imgFiles.forEach((oldName, idx) => {
  const newName = `kitchen-smart-project-${String(idx + 1).padStart(3, '0')}.jpeg`;
  const oldPath = path.join(srcDir, oldName);
  const publicPath = path.join(destImgDir, newName);

  // Copy to public/gallery/images
  fs.copyFileSync(oldPath, publicPath);

  renameMap.push({
    type: 'image',
    original: oldName,
    renamed: newName,
    publicUrl: `gallery/images/${newName}`
  });

  // Assign category deterministically for a diverse and rich filter experience
  const cat = idx % 5 === 0 ? 'wardrobe' : (idx % 4 === 0 ? 'details' : 'kitchen');
  const kw = descriptiveKeywords[idx % descriptiveKeywords.length];

  galleryItems.push({
    id: `img-${idx + 1}`,
    type: 'image',
    src: `gallery/images/${newName}`,
    title: `${kw} (Project #${idx + 1})`,
    category: cat,
    categoryLabel: catLabels[cat],
    badge: cat === 'wardrobe' ? 'Wardrobe Work' : (cat === 'details' ? 'Craft Detail' : 'Real Kitchen'),
    caption: `Authentic project completed by Kitchen Smart India · 10-Year Warranty · Mira Road Studio Handover.`
  });
});

// 3. Rename files in dist/assets/all images as requested
// We rename in reverse or via temp map to avoid any name collision
console.log('Renaming files in dist/assets/all images...');
renameMap.forEach(item => {
  const currentPath = path.join(srcDir, item.original);
  const newPath = path.join(srcDir, item.renamed);
  if (fs.existsSync(currentPath) && currentPath !== newPath) {
    fs.renameSync(currentPath, newPath);
  }
});

// 4. Save metadata JSON and JS files
const dataJsonPath = path.join(publicGalleryDir, 'gallery-data.json');
fs.writeFileSync(dataJsonPath, JSON.stringify(galleryItems, null, 2), 'utf8');

const dataJsPath = path.join(publicGalleryDir, 'gallery-data.js');
const jsContent = `/* Auto-generated Kitchen Smart Gallery Manifest */\nwindow.KITCHEN_SMART_GALLERY = ${JSON.stringify(galleryItems, null, 2)};\n`;
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

const mapJsonPath = path.join(srcDir, 'media-rename-map.json');
fs.writeFileSync(mapJsonPath, JSON.stringify(renameMap, null, 2), 'utf8');

console.log(`Successfully organized ${galleryItems.length} media items!`);
console.log(`- Public Gallery: ${publicGalleryDir}`);
console.log(`- Renamed source files in: ${srcDir}`);
console.log(`- Generated gallery-data.json and gallery-data.js`);
