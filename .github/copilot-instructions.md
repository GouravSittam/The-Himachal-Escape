# AI Coding Agent Instructions for The Himachal Escape

## Project Overview
A modern travel companion web app for Himachal Pradesh, India, built with React + TypeScript + Vite. Features immersive UI/UX with animations, particles, and travel content.

## Architecture & Key Components

### Tech Stack Foundation
- **Frontend**: React 18 + TypeScript + Vite (port 8080)
- **UI Framework**: shadcn-ui + Tailwind CSS + Plus Jakarta Sans font
- **Animations**: Framer Motion + GSAP with ScrollTrigger
- **Visual Effects**: Three.js particles, custom loading screens
- **State**: React Query for async state, React Router for navigation
- **Deployment**: Vercel with optimized static hosting

### Component Architecture
```
src/
├── components/           # Feature components
│   ├── Hero.tsx         # Multi-slide hero with GSAP animations
│   ├── Destinations.tsx # Travel destination cards
│   ├── Activities.tsx   # Activity recommendations
│   ├── Culture.tsx      # Cultural experiences
│   ├── Navigation.tsx   # Sticky nav with active section tracking
│   ├── LoadingScreen.tsx# Initial app loader with animations
│   ├── ParticleBackground.tsx # Three.js particle system
│   └── ui/              # shadcn-ui components (auto-generated)
├── pages/
│   ├── Index.tsx        # Main single-page app
│   └── NotFound.tsx     # 404 page
└── hooks/               # Custom React hooks
```

## Development Patterns

### Animation Philosophy
- **GSAP + ScrollTrigger**: Primary animation engine for scroll-based effects
- **Framer Motion**: Page transitions and component animations
- **Pattern**: Register GSAP plugins at component level: `gsap.registerPlugin(ScrollTrigger)`
- **Performance**: Use `useRef` for DOM targeting, `useEffect` for animation setup

### Component Structure Example
```tsx
// Standard component pattern with animations
const ComponentName = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // GSAP animations here
    gsap.fromTo(elementRef.current, {...}, {...});
  }, []);
  
  return <div ref={elementRef}>...</div>;
};
```

### Styling Conventions
- **Utility-first**: Tailwind CSS with custom theme extensions
- **Typography**: `font-jakarta` class for Plus Jakarta Sans
- **Spacing**: Consistent use of Tailwind spacing scale
- **Custom CSS**: Minimal, prefer Tailwind utilities

### State Management
- **Server State**: React Query (`@tanstack/react-query`)
- **Local State**: React useState/useEffect
- **No global state library** - kept simple for travel content app

## Development Workflow

### Commands
```bash
npm run dev          # Start dev server (localhost:8080)
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm run lint         # ESLint validation
```

### File Conventions
- **Components**: PascalCase TSX files
- **Imports**: Use `@/` alias for src/ directory
- **Exports**: Default exports for components
- **Types**: Inline TypeScript, no separate types/ directory

### Performance Optimizations
- **Image Preloading**: Critical images preloaded in App.tsx
- **Lazy Loading**: Ready for code splitting (not yet implemented)
- **Bundle**: Vite handles optimization, deploys to Vercel

## Content & Data
- **Static Content**: Hardcoded travel data in components
- **Images**: Unsplash URLs for travel photography
- **No Backend**: Pure frontend app with static deployment

## Integration Points
- **Vercel Deployment**: Config in `vercel.json` with Vite framework
- **Lovable Platform**: Uses `lovable-tagger` for development mode
- **External Assets**: Unsplash for images, Google Fonts for typography

## Common Patterns to Follow
1. **Animation Setup**: Always use refs + useEffect for GSAP
2. **Responsive Design**: Mobile-first with Tailwind breakpoints
3. **Component Composition**: Keep components focused and composable
4. **TypeScript**: Full type safety, no any types
5. **Performance**: Optimize images, lazy load when possible

## Debugging Notes
- **Dev Server**: Runs on port 8080 (not default 5173)
- **Hot Reload**: Vite HMR + React SWC for fast refresh
- **Build Issues**: Check Vite config for path resolution
- **Animation Debugging**: Use GSAP DevTools in browser

Focus on maintaining the immersive, travel-focused UX while ensuring smooth animations and responsive design across all devices.
