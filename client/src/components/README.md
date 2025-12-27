# Components Directory Structure

This directory contains all React components organized by their purpose and reusability level.

## Directory Organization

### `/ui` - UI Primitives

Reusable, presentational components that form the building blocks of the application. These are
generic components with no business logic or feature-specific dependencies.

**Contents:**

- **`button/`** - Button components (Button, IconButton)
- **`divider/`** - Visual divider component
- **`icons/`** - SVG icon components
- **`input/`** - Form input components (text, email, password, select, etc.)
- **`link/`** - Link and navigation components
- **`loading/`** - Loading state components
- **`switch/`** - Toggle switch component

**Exports:** All UI primitives are exported from `ui/index.ts` for convenient importing:

```typescript
import { Input, Button, LoadingWrapper } from '@components/ui';
```

### `/core` - Core Application Components

Application-specific components that provide core functionality and layout structure. These may have
business logic and feature dependencies.

**Contents:**

- **`avatar/`** - User avatar component
- **`dialog/`** - Dialog/modal components and hooks
- **`fallback/`** - Error fallback components
- **`footer/`** - Application footer
- **`header/`** - Application header and navigation
- **`meta/`** - SEO meta tags component
- **`page/`** - Page layout components
- **`MainErrorFallback.tsx`** - Top-level error boundary fallback

### `/custom` - Custom Feature Components

Specialized components for specific features that don't fit into the primitive or core categories.

**Contents:**

- **`image-selector/`** - Image selection component
- **`pantone-color/`** - Pantone color display component

### `/icon-menu` - Icon Menu Components

Feature-specific menu components using icons.

**Contents:**

- **`IconMenu.tsx`** - Icon-based menu container
- **`IconMenuItem.tsx`** - Individual menu item component

## Import Guidelines

### Using UI Primitives

UI primitives can be imported from the barrel export:

```typescript
import { Input, Button, Switch, LoadingWrapper } from '@components/ui';
```

Or directly:

```typescript
import Input from '@components/ui/input/Input';
import Button from '@components/ui/button/Button';
```

### Using Core Components

Core components should be imported directly:

```typescript
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Header from '@components/core/header/Header';
```

### Using Custom Components

Custom components are imported directly:

```typescript
import ImageSelector from '@components/custom/image-selector/ImageSelector';
import PantoneColor from '@components/custom/pantone-color/PantoneColor';
```

## Component Categories

### UI Primitives ✅

- No business logic
- Highly reusable
- Generic styling
- Prop-driven behavior
- No feature dependencies

### Core Components ⚙️

- Application-specific
- May contain business logic
- Layout and structure
- Can depend on features

### Custom Components 🎨

- Feature-specific
- Specialized use cases
- May have complex logic
- Limited reusability

## Best Practices

1. **Keep primitives generic** - UI primitives should not contain feature-specific logic
2. **Use composition** - Build complex components from simple primitives
3. **Follow naming conventions** - Use descriptive, consistent names
4. **Export properly** - Add new primitives to `ui/index.ts` for convenient access
5. **Document props** - Use TypeScript for prop types and JSDoc for descriptions
6. **Test components** - Include unit tests and stories where appropriate

## Path Aliases

Use the `@components` alias for cleaner imports:

```typescript
// ✅ Good
import { Input } from '@components/ui';
import Meta from '@components/core/meta/Meta';

// ❌ Avoid
import { Input } from '../../components/ui';
import Meta from '../../../components/core/meta/Meta';
```
