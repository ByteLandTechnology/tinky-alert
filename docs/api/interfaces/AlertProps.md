[**tinky-alert**](../README.md)

---

[tinky-alert](../globals.md) / AlertProps

# Interface: AlertProps

Props for the Alert component.

AlertProps

## Examples

Info alert with title and message:

```tsx
const infoAlert: AlertProps = {
  variant: "info",
  title: "Information",
  children: "Your request was received successfully",
};
```

Success alert without title:

```tsx
const successAlert: AlertProps = {
  variant: "success",
  children: "All systems operational",
};
```

## Properties

### children

> `readonly` **children**: `ReactNode`

The message content to display within the alert.
This is the main body of the alert and can include text or any valid ReactNode.
The message is rendered in normal (non-bold) text style for readability.
Must be a valid ReactNode (components, elements, strings, numbers, etc.).

---

### title?

> `readonly` `optional` **title**: `string`

Optional title text displayed above the message.
When provided, the title is rendered in bold text above the message body,
creating a clear visual hierarchy. The title should be a short, descriptive
summary of the alert's purpose.

Title display characteristics:

- Rendered in bold text for emphasis
- Displayed above the message content
- Optional - alert works without a title
- Should be concise (typically 1-5 words)

---

### variant

> `readonly` **variant**: `"info"` \| `"success"` \| `"error"` \| `"warning"`

The alert variant
determines the visual appearance including border color, icon, and semantic meaning.

Variant options and their meanings:

- `info`: General information or neutral messages (blue border, ℹ icon / i fallback)
- `success`: Successful operations or confirmations (green border, ✔ icon / √ fallback)
- `error`: Error messages or failure notifications (red border, ✘ icon / × fallback)
- `warning`: Warning messages or cautionary notes (yellow border, ⚠ icon / ‼ fallback)

Each variant has associated:

- Border color around the alert container
- Icon character displayed alongside the message
- Semantic meaning for accessibility and understanding
