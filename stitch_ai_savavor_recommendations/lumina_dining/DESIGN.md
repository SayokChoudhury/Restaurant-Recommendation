---
name: Lumina Dining
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#cfc2d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#988d9f'
  outline-variant: '#4d4354'
  surface-tint: '#ddb7ff'
  primary: '#ddb7ff'
  on-primary: '#490080'
  primary-container: '#b76dff'
  on-primary-container: '#400071'
  inverse-primary: '#842bd2'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#f8acff'
  on-tertiary: '#570067'
  tertiary-container: '#d164e2'
  on-tertiary-container: '#4c005a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f0dbff'
  primary-fixed-dim: '#ddb7ff'
  on-primary-fixed: '#2c0051'
  on-primary-fixed-variant: '#6900b3'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffd6ff'
  tertiary-fixed-dim: '#f8acff'
  on-tertiary-fixed: '#350040'
  on-tertiary-fixed-variant: '#7b0190'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered for a premium, AI-driven culinary discovery experience. The brand personality is sophisticated, avant-garde, and hyper-intelligent, targeting discerning diners who value both technological precision and aesthetic luxury. 

The visual direction utilizes a **Glassmorphic** style layered over a deep, obsidian foundation. This creates a sense of "digital depth," where AI-generated recommendations feel as though they are floating in a curated space. The emotional response should be one of "effortless discovery"—a seamless blend of high-end editorial fashion and cutting-edge software interfaces. Smooth micro-interactions and subtle translucency reinforce a sense of weightlessness and premium quality.

## Colors

The palette is anchored in a **Sophisticated Dark Mode**. The core background uses an ultra-deep charcoal-black to provide maximum contrast for neon accents. 

- **Primary & Secondary**: A vibrant transition from Neon Purple to Electric Blue. This gradient is reserved for high-intent actions, AI "aha" moments, and active states.
- **Surface**: Semitransparent slate tones allow for backdrop-blur effects, maintaining legibility while creating a glass-like texture.
- **Accents**: Subtle glows and strokes should use the tertiary magenta to highlight specific AI-curated "Top Matches."

## Typography

This design system utilizes **Plus Jakarta Sans** exclusively to maintain a contemporary and clean aesthetic. 

- **Display & Headlines**: Use heavy weights (700-800) with tight letter-spacing to create a bold, "tech-luxury" editorial look.
- **Body Text**: Maintain generous line heights for readability against dark backgrounds. 
- **Labels**: Small caps and increased tracking are used for metadata, such as cuisine types or price points, to differentiate them from narrative descriptions.

## Layout & Spacing

The layout follows a **Fluid Grid** system with expansive margins to evoke a premium feel. 

- **Desktop**: 12-column grid with 64px outer margins. Content is often centered in a "Stage" layout to focus the user's attention on AI recommendations.
- **Mobile**: 4-column grid with 16px margins. 
- **Rhythm**: All spacing is derived from a 8px base unit. Vertical rhythm should be loose, using "lg" and "xl" units between major sections to allow the glass elements room to "breathe" without feeling cluttered.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Luminous Shadows** rather than traditional grey drop shadows.

- **Level 1 (Base)**: Deepest black background.
- **Level 2 (Cards/Surfaces)**: Semi-transparent fill (`rgba(255, 255, 255, 0.05)`) with a `20px` backdrop-blur and a `1px` subtle border (white at 10% opacity) to define edges.
- **Level 3 (Popovers/Modals)**: Increased transparency and a subtle purple-tinted outer glow (`0px 10px 40px rgba(168, 85, 247, 0.15)`) to simulate light emission from the screen.
- **Interactions**: Elements should feel physically responsive. Hovering over a card should trigger a subtle scale-up (1.02x) and an increase in the intensity of the backdrop-blur.

## Shapes

The shape language is consistently **Rounded**, avoiding sharp edges to maintain an approachable and organic feel. 

- **Standard Elements**: Buttons and input fields use a `0.5rem` radius.
- **Featured Cards**: Use `rounded-lg` (1rem) to create a distinct container for restaurant imagery.
- **Search & AI Bubbles**: Use `rounded-xl` (1.5rem) or full pills to distinguish interactive AI elements from static content.

## Components

### Buttons
- **Primary**: Gradient fill (Purple to Blue), white text, bold weight. No border. On hover, add a subtle outer glow.
- **Secondary**: Glass background, white 1px border, 15% opacity fill. 

### Cards (Restaurant Matches)
- **Visuals**: High-resolution imagery with a bottom-to-top dark gradient overlay for text legibility.
- **States**: On hover, the border should transition from subtle white to the primary purple gradient, and the image should subtly zoom.
- **AI Badge**: A small, pill-shaped badge with a glowing purple border indicating "98% Match."

### Input Fields
- **Search Bar**: Large, rounded-xl, with a frosted glass effect. The cursor and focus ring should use the electric blue accent color.

### Lists
- **Menu Items**: Minimalist rows with high-contrast typography. Use subtle divider lines (10% opacity white).

### Chips
- **Cuisine Filters**: Small, pill-shaped glass elements. Active state uses a solid purple fill with white text.

### Progress/Loading
- **AI Processing**: A shimmer effect (skeleton screen) that pulses with a purple-to-blue gradient light, suggesting the AI is "thinking."