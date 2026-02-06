[**tinky-alert**](../README.md)

---

[tinky-alert](../globals.md) / AlertThemeProps

# Interface: AlertThemeProps

Props interface for Alert theme functions.

AlertThemeProps

## Example

```typescript
const infoProps: AlertThemeProps = { variant: "info" };
const successProps: AlertThemeProps = { variant: "success" };
const errorProps: AlertThemeProps = { variant: "error" };
const warningProps: AlertThemeProps = { variant: "warning" };
```

## Properties

### variant

> **variant**: `"info"` \| `"success"` \| `"error"` \| `"warning"`

The alert variant
determines the color scheme and icon. Each variant has specific semantic meaning:

- info: General information or neutral messages
- success: Successful operations or confirmations
- error: Error messages or failure notifications
- warning: Warning messages or cautionary notes

Variant visual characteristics:

- info: Blue border with ℹ️ icon (fallback: ℹ)
- success: Green border with ✅ icon (fallback: √)
- error: Red border with ❌ icon (fallback: ×)
- warning: Yellow border with ⚠️ icon (fallback: ‼)
