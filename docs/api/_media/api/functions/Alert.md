[**tinky-alert**](../README.md)

---

[tinky-alert](../globals.md) / Alert

# Function: Alert()

> **Alert**(`props`): `Element`

Alert component for displaying messages in terminal UIs.

## Parameters

### props

[`AlertProps`](../interfaces/AlertProps.md)

Component props

## Returns

`Element`

The rendered alert component

This is the main alert component that renders stylized message boxes with
variant-specific colors and icons for terminal applications.

Component structure:

```
┌─────────────────────┐
│  [icon]  Title    │  <- icon container + content (title + message)
│          Message     │
└─────────────────────┘
```

Rendering behavior:

1. Reads theme configuration for the Alert component
2. Resolves variant-specific styles and icon mappings
3. Renders a bordered container with variant-specific color
4. Displays icon on the left side (non-shrinking)
5. Displays content on the right side (flexible)
6. Content contains optional bold title and message

Theme integration:

- Uses `useComponentTheme` hook to resolve styles
- Styles come from `alertTheme.styles.*` functions
- Icon comes from `useFigures()` from `tinky-figures`
- Styles are applied to Box and Text components from tinky

Flex layout behavior:

- Container fills available space (flexGrow: 1)
- Icon maintains fixed size (flexShrink: 0)
- Content can expand/shrink as needed
- Content stacks title above message (flexDirection: "column")

## Examples

Simple info alert:

```tsx
<Alert variant="info">System maintenance scheduled for tonight</Alert>
```

Success alert with title:

```tsx
<Alert variant="success" title="Success">
  Your changes have been saved
</Alert>
```

Error alert:

```tsx
<Alert variant="error" title="Connection Error">
  Unable to reach the server. Please try again later.
</Alert>
```

Warning alert:

```tsx
<Alert variant="warning" title="Disk Space Low">
  You are using 90% of your available storage
</Alert>
```

## See

- [AlertProps](../interfaces/AlertProps.md)
- [alertTheme](../variables/alertTheme.md)
