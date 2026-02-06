[**tinky-alert**](../README.md)

---

[tinky-alert](../globals.md) / AlertTheme

# Type Alias: AlertTheme

> **AlertTheme** = _typeof_ [`alertTheme`](../variables/alertTheme.md)

Type definition for the Alert theme.

## Example

Creating a custom theme that extends the base:

```typescript
import type { AlertTheme } from "tinky-alert";

const customTheme: AlertTheme = {
  ...alertTheme,
  styles: {
    ...alertTheme.styles,
    container: () => ({
      borderStyle: "double", // Changed border style
    }),
  },
};
```

## See

- [alertTheme](../variables/alertTheme.md)
- [AlertThemeProps](../interfaces/AlertThemeProps.md)
- [ComponentTheme](#)
