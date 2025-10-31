# CSS Filter Generator - CSSFilter.com

A modern, interactive CSS filter generator built with Next.js. Create stunning CSS filters with drag-and-drop reordering and real-time preview.

![CSS Filter Generator](https://cssfilter.com/simple.png)

## Features

- 🎨 **Real-time CSS Filter Preview** - See your filters applied instantly
- 🔄 **Drag & Drop Reordering** - Easily change filter order with smooth animations
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎯 **CSS Code Generation** - Copy-ready CSS with optional browser prefixes
- 🖼️ **Multiple Demo Images** - Test your filters on various images
- ⚡ **Static Export Ready** - Deploy anywhere with static hosting

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Generate static export
npm run build && npx next export
```

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **@dnd-kit** - Modern drag and drop library
- **Static Export** - Deploy to any static hosting service

## Deployment

The app is configured for static export and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

After building, the static files will be in the `out/` directory.

## CSS Filters Supported

- Blur
- Brightness
- Contrast
- Grayscale
- Hue-Rotate
- Invert
- Opacity
- Saturate
- Sepia

## Browser Support

- Chrome 18+
- Firefox 35+
- Safari 6+
- Edge (partial support)
- Opera 15+
- iOS Safari 6.1+
- Android 4.4+

## Migrated from Legacy Version

This is a complete rewrite of the original jQuery-based CSS Filter Generator, now built with modern React/Next.js for better performance, maintainability, and user experience.

### Key Improvements

- Modern React architecture with TypeScript
- Smooth drag-and-drop with @dnd-kit
- Better mobile responsiveness
- Improved accessibility
- Static export for easy deployment
- No server requirements

## License

This project is open source. Feel free to use the generated CSS in your projects without attribution.

---

Created by [Greg Gant](https://greggant.com) | [View on GitHub](https://github.com/fuzzywalrus/cssfiltergenerator.com)