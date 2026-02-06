/**
 * Main entry point for the tinky-alert package.
 *
 * This module provides the public API for the tinky-alert package, exporting
 * the Alert component and its associated theme configuration.
 *
 * The package exports:
 * - `Alert` - Main alert component for displaying messages in terminal UIs
 * - `AlertProps` - TypeScript interface for Alert component props
 * - `alertTheme` - Default theme configuration for Alert components
 * - `AlertTheme` - TypeScript type for the Alert theme
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { Alert } from "tinky-alert";
 *
 * <Alert variant="success" title="Success">
 *   Operation completed successfully
 * </Alert>
 * ```
 *
 * @example
 * With theme provider:
 * ```tsx
 * import { Alert, alertTheme } from "tinky-alert";
 * import { ThemeProvider } from "tinky-theme";
 *
 * <ThemeProvider theme={{ components: { Alert: alertTheme } }}>
 *   <Alert variant="info" title="Information">
 *     Important information message
 *   </Alert>
 * </ThemeProvider>
 * ```
 *
 * @see {@link Alert}
 * @see {@link alertTheme}
 */

export { Alert, type AlertProps } from "./components/Alert.js";
export {
  default as alertTheme,
  type AlertTheme,
  type AlertThemeProps,
} from "./themes/alert-theme.js";
export { isUnicodeSupported } from "./utils/unicode.js";
