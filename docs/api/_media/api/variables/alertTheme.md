[**tinky-alert**](../README.md)

---

[tinky-alert](../globals.md) / alertTheme

# Variable: alertTheme

> `const` **alertTheme**: `object`

Default theme configuration for Alert components.

This theme provides all necessary style functions and configuration for rendering
Alert components in terminal UIs. It follows the tinky-theme ComponentTheme
interface for seamless integration with the theme system.

Theme structure:

- `styles` - Style functions for each component element

Style functions:
Each style function returns props for the corresponding component:

- `styles.container(props)` - BoxProps for the alert container
- `styles.iconContainer()` - BoxProps for the icon wrapper
- `styles.icon(props)` - TextProps for the icon character
- `styles.content()` - BoxProps for the content wrapper
- `styles.title()` - TextProps for the title text
- `styles.message()` - TextProps for the message text

## Type Declaration

### styles

> **styles**: `object`

#### styles.container()

> **container**: (`props`) => `BoxProps`

Style function for the alert container.

##### Parameters

###### props

[`AlertThemeProps`](../interfaces/AlertThemeProps.md)

Props containing the variant

##### Returns

`BoxProps`

Props for rendering the alert container

The container provides the main visual structure of the alert with:

- Rounded border style (box drawing characters)
- Variant-specific border color
- Flexible layout for responsive sizing
- Internal spacing for content

Applied styles:

- `flexGrow: 1` - Allows container to fill available space
- `borderStyle: "round"` - Rounded box drawing characters
- `borderColor: variant-specific` - Color based on variant
- `gap: 1` - Spacing between icon and content
- `paddingX: 1` - Horizontal padding inside the border

##### Example

```typescript
import { alertTheme } from "tinky-alert";

const errorContainer = alertTheme.styles.container({ variant: "error" });
// Returns: { flexGrow: 1, borderStyle: "round", borderColor: "red", gap: 1, paddingX: 1 }
```

#### styles.content()

> **content**: () => `BoxProps`

Style function for the content container.

##### Returns

`BoxProps`

Props for rendering the content wrapper

The content container holds the title and message text, providing
proper layout and sizing constraints.

Applied styles:

- `flexShrink: 1` - Allows content to shrink if needed
- `flexGrow: 1` - Allows content to expand if space available
- `minWidth: 0` - Enables proper flex shrinking behavior
- `flexDirection: "column"` - Stacks title above message
- `gap: 1` - Spacing between title and message

The combination of `flexShrink: 1` and `minWidth: 0` is important
for proper flex behavior when the container needs to shrink.

##### Example

```typescript
import { alertTheme } from "tinky-alert";

const contentStyles = alertTheme.styles.content();
// Returns: { flexShrink: 1, flexGrow: 1, minWidth: 0, flexDirection: "column", gap: 1 }
```

#### styles.icon()

> **icon**: (`props`) => `TextProps`

Style function for the icon text element.

##### Parameters

###### props

[`AlertThemeProps`](../interfaces/AlertThemeProps.md)

Props containing the variant

##### Returns

`TextProps`

Props for rendering the icon character

The icon is a variant-specific emoji character.

Applied styles:

- `color: variant-specific` - Color based on variant

Icon mapping: - info: `"ℹ️"` (fallback: `"ℹ"`) - success: `"✅"` (fallback: `"√"`) - error: `"❌"` (fallback: `"×"`) - warning: `"⚠️"` (fallback: `"‼"`)

##### Example

```typescript
import { alertTheme } from "tinky-alert";

const successIconStyles = alertTheme.styles.icon({ variant: "success" });
// Returns: { color: "green" }
```

#### styles.iconContainer()

> **iconContainer**: () => `BoxProps`

Style function for the icon container.

##### Returns

`BoxProps`

Props for rendering the icon container

The icon container wraps the icon character and ensures it maintains
its size regardless of content layout.

Applied styles:

- `flexShrink: 0` - Prevents icon from shrinking

This ensures the icon always displays at its full size, even when
the content area needs to shrink to fit constraints.

##### Example

```typescript
import { alertTheme } from "tinky-alert";

const iconContainerStyles = alertTheme.styles.iconContainer();
// Returns: { flexShrink: 0 }
```

#### styles.message()

> **message**: () => `TextProps`

Style function for the message text element.

##### Returns

`TextProps`

Props for rendering the message text

The message is the main content of the alert, providing detailed
information about the alert's purpose.

Applied styles:

- (none) - Default text styling

The message uses normal text styling, allowing it to be more
readable and less visually demanding than the bold title.

##### Example

```typescript
import { alertTheme } from "tinky-alert";

const messageStyles = alertTheme.styles.message();
// Returns: {}
```

#### styles.title()

> **title**: () => `TextProps`

Style function for the title text element.

##### Returns

`TextProps`

Props for rendering the title text

The title is displayed above the message and serves as a summary
or headline for the alert content.

Applied styles:

- `bold: true` - Renders text in bold for emphasis

The bold styling makes the title stand out from the message body,
allowing users to quickly scan and identify alerts.

##### Example

```typescript
import { alertTheme } from "tinky-alert";

const titleStyles = alertTheme.styles.title();
// Returns: { bold: true }
```

## Examples

Using the theme directly:

```tsx
import { alertTheme } from "tinky-alert";

const { styles } = alertTheme;
const containerProps = styles.container({ variant: "success" });
// containerProps === { flexGrow: 1, borderStyle: "round", borderColor: "green", gap: 1, paddingX: 1 }

<Box {...containerProps}>Alert content</Box>;
```

Integrating with theme provider:

```tsx
import { ThemeProvider } from "tinky-theme";
import { alertTheme } from "tinky-alert";

<ThemeProvider
  theme={{
    components: {
      Alert: alertTheme,
    },
  }}
>
  <Alert variant="info">Info message</Alert>
</ThemeProvider>;
```

## See

- [AlertTheme](../type-aliases/AlertTheme.md)
- [AlertProps](../interfaces/AlertProps.md)
