**tinky-alert**

---

# tinky-alert

> A React-like alert component library for building beautiful terminal UIs.

![npm](https://img.shields.io/npm/v/tinky-alert)
![license](https://img.shields.io/npm/l/tinky-alert)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

`tinky-alert` provides a fully-featured alert component for terminal applications built with the [tinky](https://github.com/ByteLandTechnology/tinky) framework. It supports four semantic variants with automatic color mapping and icon selection.

## Features

- **📝 Simple API** - Intuitive JSX-based syntax for displaying alerts
- **🎨 Themeable** - Full integration with [tinky-theme](https://github.com/ByteLandTechnology/tinky-theme)
- **🎯 Type Safe** - Built with TypeScript for excellent developer experience
- **🧪 Well Tested** - Comprehensive test coverage with unit and integration tests
- **📚 Documented** - Complete API documentation generated with TypeDoc
- **✨ Four Variants** - info, success, error, and warning with semantic meanings

## Installation

```bash
npm install tinky-alert
# or
bun add tinky-alert
# or
yarn add tinky-alert
```

## Quick Start

```tsx
import { render } from "tinky";
import { Alert } from "tinky-alert";

function App() {
  return (
    <Alert variant="info" title="Information">
      This is an informational message
    </Alert>
  );
}

render(<App />);
```

## Usage

### Basic Alert

Create a simple alert message:

```tsx
import { Alert } from "tinky-alert";

<Alert variant="success">Operation completed successfully</Alert>;
```

### Alert with Title

Add a title for better visual hierarchy:

```tsx
import { Alert } from "tinky-alert";

<Alert variant="error" title="Error">
  Failed to connect to the server
</Alert>;
```

### All Variants

Use the four semantic variants for different message types:

```tsx
<Alert variant="info" title="Info">
  General information message
</Alert>

<Alert variant="success" title="Success">
  Your changes have been saved
</Alert>

<Alert variant="error" title="Error">
  Something went wrong
</Alert>

<Alert variant="warning" title="Warning">
  Please review your settings
</Alert>
```

### Theme Integration

Integrate with the tinky-theme system:

```tsx
import { ThemeProvider, defaultTheme, extendTheme } from "tinky-theme";
import { Alert } from "tinky-alert";

// Using default theme
<ThemeProvider theme={defaultTheme}>
  <Alert variant="success">Success message</Alert>
</ThemeProvider>;

// Using custom theme
const customTheme = extendTheme(defaultTheme, {
  components: {
    Alert: {
      styles: {
        container: () => ({
          borderStyle: "double",
        }),
      },
    },
  },
});

<ThemeProvider theme={customTheme}>
  <Alert variant="info">Custom styled alert</Alert>
</ThemeProvider>;
```

## API Documentation

For complete API documentation, type definitions, and usage examples, visit the [API Docs](_media/api).

### Component

#### `Alert`

The main alert component for displaying messages in terminal UIs.

**Props:**

| Property   | Type                                          | Required | Description                      |
| ---------- | --------------------------------------------- | -------- | -------------------------------- |
| `children` | `ReactNode`                                   | Yes      | The message content to display   |
| `variant`  | `"info" \| "success" \| "error" \| "warning"` | Yes      | Alert variant for styling        |
| `title`    | `string`                                      | No       | Optional title above the message |

**Example:**

```tsx
<Alert variant="success" title="Success">
  Operation completed
</Alert>
```

### Variants

#### `info`

Informational messages with blue border and ℹ️ icon.

**Characteristics:**

- Blue border color
- Information icon (ℹ️)
- Used for general information or neutral messages

**Example:**

```tsx
<Alert variant="info" title="Info">
  System maintenance scheduled for tonight
</Alert>
```

#### `success`

Success messages with green border and ✅ icon.

**Characteristics:**

- Green border color
- Success/checkmark icon (✅)
- Used for successful operations or confirmations

**Example:**

```tsx
<Alert variant="success" title="Success">
  Your changes have been saved
</Alert>
```

#### `error`

Error messages with red border and ❌ icon.

**Characteristics:**

- Red border color
- Error/cross icon (❌)
- Used for error messages or failure notifications

**Example:**

```tsx
<Alert variant="error" title="Error">
  Unable to reach the server
</Alert>
```

#### `warning`

Warning messages with yellow border and ⚠️ icon.

**Characteristics:**

- Yellow border color
- Warning icon (⚠️)
- Used for warning messages or cautionary notes

**Example:**

```tsx
<Alert variant="warning" title="Warning">
  Your session will expire in 5 minutes
</Alert>
```

### Theme Configuration

#### `AlertTheme`

Type definition for the Alert theme configuration.

**Properties:**

| Property | Type       | Description                                    |
| -------- | ---------- | ---------------------------------------------- |
| `styles` | `Object`   | Style functions for each element               |
| `config` | `Function` | Configuration function returning theme options |

**Style Functions:**

- `styles.container(props)` - Styles for the alert container
- `styles.iconContainer()` - Styles for the icon wrapper
- `styles.icon(props)` - Styles for the icon text
- `styles.content()` - Styles for the content wrapper
- `styles.title()` - Styles for the title text
- `styles.message()` - Styles for the message text

**Configuration:**

- `config(props)` - Returns variant-specific icon

**Example:**

```tsx
import { alertTheme } from "tinky-alert";

const { styles, config } = alertTheme;
const containerStyles = styles.container({ variant: "success" });
// containerStyles === { flexGrow: 1, borderStyle: "round", borderColor: "green", gap: 1, paddingX: 1 }

const iconConfig = config({ variant: "error" });
// iconConfig === { icon: "❌" }
```

## Visual Examples

### Info Alert

```
┌──────────────────────────┐
│ ℹ️  Information        │
│   This is an info      │
│   message for users    │
└──────────────────────────┘
```

### Success Alert

```
┌──────────────────────────┐
│ ✅  Success            │
│   Your operation       │
│   completed            │
└──────────────────────────┘
```

### Error Alert

```
┌──────────────────────────┐
│ ❌  Error              │
│   Failed to connect    │
│   to server            │
└──────────────────────────┘
```

### Warning Alert

```
┌──────────────────────────┐
│ ⚠️  Warning            │
│   Your session will    │
│   expire soon          │
└──────────────────────────┘
```

## Development

### Setup

```bash
# Install dependencies
bun install

# Run tests
bun test

# Build the project
bun run build

# Lint code
bun run lint

# Generate documentation
bun run docs
```

## Related Packages

- [tinky](https://github.com/ByteLandTechnology/tinky) - React for CLIs
- [tinky-theme](https://github.com/ByteLandTechnology/tinky-theme) - Theme system for tinky
- [tinky-test](https://github.com/ByteLandTechnology/tinky-test) - Testing utilities for tinky

## Acknowledgments

- [ink-ui](https://github.com/vadimdemedes/ink-ui) - Inspiration for Alert component by Vadim Demedes

## License

MIT © [ByteLand Technology Limited](https://github.com/ByteLandTechnology)
