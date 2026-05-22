# Lucas Guerra — Portfolio Cinematográfico

## 1. Concept & Vision

Uma experiência imersiva onde o usuário **entra na identidade do desenvolvedor através do scroll**. O nome "Lucas Guerra" funciona como um portal — começando como elemento central ocupando toda a viewport, crescendo cinematicamente até envolver completamente o usuário, criando uma sensação de imersão e escala que transcende portfolios tradicionais.

A experiência transmite **sofisticação tecnológica premium** — como um site de estúdio criativo de alto nível, não um template genérico. Cada scroll é uma jornada, cada seção uma cena, cada animação uma decisão intencional.

## 2. Design Language

### Aesthetic Direction
**Neo-Futurism Minimalist** — Inspirado em interfaces de ciencia-fiction premium, airports de última geração, e studios criativos como Resn e Active Theory. Clean, atmospheric, com profundidade através de luz e sombra.

### Color Palette
```
--bg-primary: #050816         /* Azul noturno profundo */
--bg-secondary: #07111f       /* Azul escuro sutil */
--bg-tertiary: #0a1628         /* Camada de suporte */
--accent-primary: #00d4ff     /* Ciano elétrico - luz principal */
--accent-secondary: #7b5cff   /* Violeta frio - brilho secundário */
--accent-tertiary: #00ff88     /* Verde digital - highlights sutis */
--text-primary: #ffffff       /* Branco puro */
--text-secondary: #8892a4      /* Cinza azulado - texto secundário */
--text-muted: #4a5568         /* Cinza escuro - labels */
--glow-primary: rgba(0, 212, 255, 0.4)
--glow-secondary: rgba(123, 92, 255, 0.3)
```

### Typography
- **Display**: "Syne" (Google Fonts) — Geométrica, moderna, forte personalidade
- **Body**: "Space Grotesk" (Google Fonts) — Técnica, legível, tecnológica
- **Fallback**: system-ui, sans-serif

### Spatial System
- Base unit: 8px
- Section padding: 120px vertical (desktop), 80px (tablet), 60px (mobile)
- Content max-width: 1400px
- Grid: 12 columns, 24px gap

### Motion Philosophy
- **Easing**: custom cubic-bezier para suavidade cinematográfica
- **Duration**: 0.8-1.2s para transições principais, 0.3s para microinterações
- **Principle**: motion deve revelar profundidade, nunca decorar
- **Stagger**: 0.1s entre elementos sequenciais
- **Scroll-linked**: animações sincronizadas com scroll position

### Visual Assets
- **Icons**: Lucide React — line icons, 1.5px stroke
- **Decorative**: Gradientes radiais, linhas de luz sutis, partículas flutuantes
- **Textures**: Noise overlay sutil (3-5% opacity) para evitar flatness

## 3. Layout & Structure

### Page Architecture
```
[Loading Screen] → [Hero - Name Expansion] → [About] → [Skills] → [Projects] → [Contact]
```

### Visual Pacing
1. **Loading** (2-3s): Logo minimalista + progress bar
2. **Hero** (100vh): Nome ocupa 100%, scroll trigger começa expansão
3. **About** (100vh): Texto emerge do blur, tipografia grande
4. **Skills** (auto): Grid de cards com hover effects
5. **Projects** (auto): Featured projects com video preview opcional
6. **Contact** (100vh): Encerramento cinematográfico, links sociais

### Responsive Strategy
- **Desktop (1200px+)**: Layout completo, efeitos full
- **Tablet (768px-1199px)**: Simplified parallax, maintained core experience
- **Mobile (< 768px)**: Scroll-driven animations, touch-friendly targets

## 4. Features & Interactions

### Loading Screen
- Fade in: 0.5s
- Progress bar: 2s duration, ease-out
- Logo pulse animation
- Exit: fade out 0.8s, content reveal

### Hero - Name Expansion
- **Initial state**: "Lucas Guerra" centered, font-size: clamp(3rem, 10vw, 8rem)
- **Scroll behavior**:
  - 0-30% scroll: font-size grows to 200px, opacity 1
  - 30-50% scroll: letters begin to separate, blur increases
  - 50-70% scroll: scale continues, letters move outward
  - 70-100% scroll: name exits viewport, opacity fades
- **Parallax layers**: Background gradient shifts subtly
- **Light effect**: Subtle glow follows cursor position

### About Section
- **Entry**: Title slides from left with blur (0→0 blur)
- **Content**: Paragraphs stagger in with 0.2s delay
- **Scroll parallax**: Content moves at 0.8x scroll speed
- **Background**: Gradient intensifies

### Skills Section
- **Layout**: 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- **Cards**: Glass-morphism effect with border glow
- **Hover**: Scale 1.02, border glow intensifies, icon rotates
- **Animation**: Cards fade-in on scroll intersection

### Projects Section
- **Layout**: Featured project large, smaller grid below
- **Card interaction**:
  - Image parallax on scroll
  - Title reveal on hover
  - Glow effect on focus
- **Transition**: Smooth scroll-snap optional

### Contact Section
- **Entry animation**: Social links fade in staggered
- **Background**: Subtle particle effect or gradient animation
- **CTA**: "Let's create" with glowing button

### Global Interactions
- **Custom cursor**:
  - Default: small circle (12px), border accent color
  - Hover on links/buttons: expand (24px), fill with accent
  - Smooth follow with 0.1s delay
- **Smooth scroll**: Native scroll with GSAP lenis-like smoothing
- **Section transitions**: Content slides up with opacity

## 5. Component Inventory

### LoadingScreen
- States: loading, complete, hidden
- Visual: centered logo, horizontal progress bar below
- Progress bar: height 2px, gradient fill, glow effect

### CustomCursor
- States: default, hovering, clicking
- Follows mouse with lerp interpolation
- Hidden on mobile/touch devices

### Navigation
- Fixed position, top
- Transparent background with blur on scroll
- Logo left, menu items right
- Mobile: hamburger menu with full-screen overlay

### Hero
- Full viewport height
- Centered name text with letter spacing animation
- Background: radial gradient with noise texture
- Ambient light effect following cursor

### SectionTitle
- Large display text with gradient
- Decorative line or accent element
- Entrance animation: clip-path reveal or fade + slide

### AboutCard
- Glass-morphism container
- Avatar placeholder (gradient or initial)
- Text content with staggered reveal

### SkillCard
- Icon, title, brief description
- Border with subtle glow
- Hover: scale, glow intensify

### ProjectCard
- Image/placeholder background
- Overlay with title, tech stack
- Hover: image zoom, overlay reveal

### SocialLink
- Icon + label
- Glowing border on hover
- Staggered entrance animation

### ScrollIndicator
- Position: bottom center of hero
- Animated chevron or mouse icon
- Fades out after first scroll

## 6. Technical Approach

### Stack
- **Framework**: React 18 + Vite
- **Animation**: GSAP 3 + ScrollTrigger
- **Styling**: CSS Modules + CSS Variables
- **Icons**: Lucide React

### Architecture
```
src/
├── components/
│   ├── LoadingScreen/
│   ├── CustomCursor/
│   ├── Navigation/
│   ├── Hero/
│   ├── About/
│   ├── Skills/
│   ├── Projects/
│   ├── Contact/
│   └── ui/
├── hooks/
│   ├── useScrollTrigger.js
│   └── useCursor.js
├── styles/
│   ├── variables.css
│   ├── global.css
│   └── animations.css
├── utils/
│   └── constants.js
├── App.jsx
└── main.jsx
```

### Animation Strategy
- ScrollTrigger for scroll-linked animations
- GSAP timeline for sequenced animations
- CSS transitions for simple hover states
- requestAnimationFrame for cursor interpolation

### Performance Considerations
- Lazy load sections below fold
- Use will-change sparingly and remove after animation
- Throttle scroll events
- Prefer transform/opacity over layout-triggering properties
- Reduce motion for prefers-reduced-motion