/**
 * Theme configuration and styling for Alert components.
 *
 * This module provides the default theme configuration for Alert components,
 * including variant-specific colors, icons, and styling functions.
 *
 * The theme system supports:
 * - Four alert variants: info, success, error, warning
 * - Automatic color mapping for each variant
 * - Variant-specific icon selection with automatic Unicode/fallback detection
 * - Consistent styling across all alert elements
 * - Integration with the tinky-theme system
 *
 * Variant configurations:
 * - info: Blue color with ℹ️ icon (fallback: ℹ)
 * - success: Green color with ✅ icon (fallback: √)
 * - error: Red color with ❌ icon (fallback: ×)
 * - warning: Yellow color with ⚠️ icon (fallback: ‼)
 *
 * The module exports:
 * 1. `alertTheme` - Complete theme with styles
 * 2. `AlertTheme` - Type definition of the theme
 * 3. `AlertThemeProps` - Props interface for theme functions
 *
 * @example
 * Using the default theme:
 * ```tsx
 * import { Alert, alertTheme } from "tinky-alert";
 * import { ThemeProvider } from "tinky-theme";
 *
 * <ThemeProvider theme={{ components: { Alert: alertTheme } }}>
 *   <Alert variant="info">
 *     Information message
 *   </Alert>
 * </ThemeProvider>
 * ```
 *
 * @example
 * Customizing via theme extension:
 * ```tsx
 * import { extendTheme } from "tinky-theme";
 * import { alertTheme } from "tinky-alert";
 *
 * const customTheme = extendTheme(defaultTheme, {
 *   components: {
 *     Alert: {
 *       styles: {
 *         container: () => ({
 *           borderStyle: "double"
 *         })
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * @see {@link AlertTheme}
 * @see {@link Alert}
 */

import { type BoxProps, type TextProps } from "tinky";
import { type ComponentTheme } from "tinky-theme";

/**
 * Color mapping for alert variants.
 *
 * Maps each variant to its corresponding terminal color:
 * - info → blue
 * - success → green
 * - error → red
 * - warning → yellow
 *
 * These colors are used for:
 * - Border color around the alert container
 * - Icon color for visual emphasis
 * - Any other variant-specific styling
 *
 * @constant {Record<string, string>}
 * @private
 */
const colorByVariant: Record<string, string> = {
  info: "blue",
  success: "green",
  error: "red",
  warning: "yellow",
};

/**
 * Props interface for Alert theme functions.
 *
 * @interface AlertThemeProps
 *
 * @property {"info" | "success" | "error" | "warning"} variant - The alert variant
 *   determines the color scheme and icon. Each variant has specific semantic meaning:
 *   - info: General information or neutral messages
 *   - success: Successful operations or confirmations
 *   - error: Error messages or failure notifications
 *   - warning: Warning messages or cautionary notes
 *
 * Variant visual characteristics:
 * - info: Blue border with ℹ️ icon (fallback: ℹ)
 * - success: Green border with ✅ icon (fallback: √)
 * - error: Red border with ❌ icon (fallback: ×)
 * - warning: Yellow border with ⚠️ icon (fallback: ‼)
 *
 * @example
 * ```typescript
 * const infoProps: AlertThemeProps = { variant: "info" };
 * const successProps: AlertThemeProps = { variant: "success" };
 * const errorProps: AlertThemeProps = { variant: "error" };
 * const warningProps: AlertThemeProps = { variant: "warning" };
 * ```
 */
export interface AlertThemeProps {
  variant: "info" | "success" | "error" | "warning";
}

/**
 * Default theme configuration for Alert components.
 *
 * This theme provides all necessary style functions and configuration for rendering
 * Alert components in terminal UIs. It follows the tinky-theme ComponentTheme
 * interface for seamless integration with the theme system.
 *
 * Theme structure:
 * - `styles` - Style functions for each component element
 *
 * Style functions:
 * Each style function returns props for the corresponding component:
 * - `styles.container(props)` - BoxProps for the alert container
 * - `styles.iconContainer()` - BoxProps for the icon wrapper
 * - `styles.icon(props)` - TextProps for the icon character
 * - `styles.content()` - BoxProps for the content wrapper
 * - `styles.title()` - TextProps for the title text
 * - `styles.message()` - TextProps for the message text
 *
 * @example
 * Using the theme directly:
 * ```tsx
 * import { alertTheme } from "tinky-alert";
 *
 * const { styles } = alertTheme;
 * const containerProps = styles.container({ variant: "success" });
 * // containerProps === { flexGrow: 1, borderStyle: "round", borderColor: "green", gap: 1, paddingX: 1 }
 *
 * <Box {...containerProps}>
 *   Alert content
 * </Box>
 * ```
 *
 * @example
 * Integrating with theme provider:
 * ```tsx
 * import { ThemeProvider } from "tinky-theme";
 * import { alertTheme } from "tinky-alert";
 *
 * <ThemeProvider theme={{
 *   components: {
 *     Alert: alertTheme
 *   }
 * }}>
 *   <Alert variant="info">Info message</Alert>
 * </ThemeProvider>
 * ```
 *
 * @see {@link AlertTheme}
 * @see {@link AlertProps}
 */
const alertTheme = {
  styles: {
    /**
     * Style function for the alert container.
     *
     * @param {AlertProps} props - Props containing the variant
     * @returns {BoxProps} Props for rendering the alert container
     *
     * The container provides the main visual structure of the alert with:
     * - Rounded border style (box drawing characters)
     * - Variant-specific border color
     * - Flexible layout for responsive sizing
     * - Internal spacing for content
     *
     * Applied styles:
     * - `flexGrow: 1` - Allows container to fill available space
     * - `borderStyle: "round"` - Rounded box drawing characters
     * - `borderColor: variant-specific` - Color based on variant
     * - `gap: 1` - Spacing between icon and content
     * - `paddingX: 1` - Horizontal padding inside the border
     *
     * @example
     * ```typescript
     * import { alertTheme } from "tinky-alert";
     *
     * const errorContainer = alertTheme.styles.container({ variant: "error" });
     * // Returns: { flexGrow: 1, borderStyle: "round", borderColor: "red", gap: 1, paddingX: 1 }
     * ```
     */
    container: ({ variant }: AlertThemeProps): BoxProps => ({
      flexGrow: 1,
      borderStyle: "round",
      borderColor: colorByVariant[variant],
      gap: 1,
      paddingX: 1,
    }),

    /**
     * Style function for the icon container.
     *
     * @returns {BoxProps} Props for rendering the icon container
     *
     * The icon container wraps the icon character and ensures it maintains
     * its size regardless of content layout.
     *
     * Applied styles:
     * - `flexShrink: 0` - Prevents icon from shrinking
     *
     * This ensures the icon always displays at its full size, even when
     * the content area needs to shrink to fit constraints.
     *
     * @example
     * ```typescript
     * import { alertTheme } from "tinky-alert";
     *
     * const iconContainerStyles = alertTheme.styles.iconContainer();
     * // Returns: { flexShrink: 0 }
     * ```
     */
    iconContainer: (): BoxProps => ({
      flexShrink: 0,
    }),

    /**
     * Style function for the icon text element.
     *
     * @param {AlertProps} props - Props containing the variant
     * @returns {TextProps} Props for rendering the icon character
     *
     * The icon is a variant-specific emoji character.
     *
     * Applied styles:
     * - `color: variant-specific` - Color based on variant
     *
     * Icon mapping:
     *      - info: `"ℹ️"` (fallback: `"ℹ"`)
     *      - success: `"✅"` (fallback: `"√"`)
     *      - error: `"❌"` (fallback: `"×"`)
     *      - warning: `"⚠️"` (fallback: `"‼"`)
     *
     * @example
     * ```typescript
     * import { alertTheme } from "tinky-alert";
     *
     * const successIconStyles = alertTheme.styles.icon({ variant: "success" });
     * // Returns: { color: "green" }
     * ```
     */
    icon: ({ variant }: AlertThemeProps): TextProps => ({
      color: colorByVariant[variant],
    }),

    /**
     * Style function for the content container.
     *
     * @returns {BoxProps} Props for rendering the content wrapper
     *
     * The content container holds the title and message text, providing
     * proper layout and sizing constraints.
     *
     * Applied styles:
     * - `flexShrink: 1` - Allows content to shrink if needed
     * - `flexGrow: 1` - Allows content to expand if space available
     * - `minWidth: 0` - Enables proper flex shrinking behavior
     * - `flexDirection: "column"` - Stacks title above message
     * - `gap: 1` - Spacing between title and message
     *
     * The combination of `flexShrink: 1` and `minWidth: 0` is important
     * for proper flex behavior when the container needs to shrink.
     *
     * @example
     * ```typescript
     * import { alertTheme } from "tinky-alert";
     *
     * const contentStyles = alertTheme.styles.content();
     * // Returns: { flexShrink: 1, flexGrow: 1, minWidth: 0, flexDirection: "column", gap: 1 }
     * ```
     */
    content: (): BoxProps => ({
      flexShrink: 1,
      flexGrow: 1,
      minWidth: 0,
      flexDirection: "column",
      gap: 1,
    }),

    /**
     * Style function for the title text element.
     *
     * @returns {TextProps} Props for rendering the title text
     *
     * The title is displayed above the message and serves as a summary
     * or headline for the alert content.
     *
     * Applied styles:
     * - `bold: true` - Renders text in bold for emphasis
     *
     * The bold styling makes the title stand out from the message body,
     * allowing users to quickly scan and identify alerts.
     *
     * @example
     * ```typescript
     * import { alertTheme } from "tinky-alert";
     *
     * const titleStyles = alertTheme.styles.title();
     * // Returns: { bold: true }
     * ```
     */
    title: (): TextProps => ({
      bold: true,
    }),

    /**
     * Style function for the message text element.
     *
     * @returns {TextProps} Props for rendering the message text
     *
     * The message is the main content of the alert, providing detailed
     * information about the alert's purpose.
     *
     * Applied styles:
     * - (none) - Default text styling
     *
     * The message uses normal text styling, allowing it to be more
     * readable and less visually demanding than the bold title.
     *
     * @example
     * ```typescript
     * import { alertTheme } from "tinky-alert";
     *
     * const messageStyles = alertTheme.styles.message();
     * // Returns: {}
     * ```
     */
    message: (): TextProps => ({}),
  },
} satisfies ComponentTheme<AlertThemeProps>;

export default alertTheme;

/**
 * Type definition for the Alert theme.
 *
 * @type {typeof alertTheme}
 *
 * This type represents the complete theme structure for Alert components,
 * including all style functions.
 *
 * Type structure:
 * ```typescript
 * type AlertTheme = {
 *   styles: {
 *     container: (props: AlertThemeProps) => BoxProps;
 *     iconContainer: () => BoxProps;
 *     icon: (props: AlertThemeProps) => TextProps;
 *     content: () => BoxProps;
 *     title: () => TextProps;
 *     message: () => TextProps;
 *   };
 * }
 * ```
 *
 * @example
 * Creating a custom theme that extends the base:
 * ```typescript
 * import type { AlertTheme } from "tinky-alert";
 *
 * const customTheme: AlertTheme = {
 *   ...alertTheme,
 *   styles: {
 *     ...alertTheme.styles,
 *     container: () => ({
 *       borderStyle: "double"  // Changed border style
 *     })
 *   },
 * };
 * ```
 *
 * @see {@link alertTheme}
 * @see {@link AlertThemeProps}
 * @see {@link ComponentTheme}
 */
export type AlertTheme = typeof alertTheme;
