import { resolve } from 'path'
import { defineConfig } from 'vite'

// Vite multi-page config for Kitchen Smart India
export default defineConfig({
  base: './',
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aboutUs: resolve(__dirname, 'about-us.html'),
        ourFounder: resolve(__dirname, 'our-founder.html'),
        whyUs: resolve(__dirname, 'why-us.html'),
        modularKitchen: resolve(__dirname, 'modular-kitchen-in-mumbai.html'),
        wardrobeDesign: resolve(__dirname, 'wardrobe-design.html'),
        kitchenDesigns: resolve(__dirname, 'kitchen-designs.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
