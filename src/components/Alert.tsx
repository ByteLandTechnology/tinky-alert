/**
 * Alert component implementation for terminal UI applications.
 *
 * This module provides the Alert component, a message display component for
 * showing notifications, warnings, errors, and information in terminal interfaces.
 * The component supports four variants with semantic colors and icons.
 *
 * Key features:
 * - Four semantic variants: info, success, error, warning
 * - Automatic color mapping for each variant
 * - Variant-specific icons from the figures library
 * - Optional title for message summarization
 * - Integration with tinky-theme for consistent styling
 * - Flexible content support via ReactNode
 *
 * Variant characteristics:
 * - info: Blue color with ℹ icon (fallback: i) for general information
 * - success: Green color with ✔ icon (fallback: √) for successful operations
 * - error: Red color with ✘ icon (fallback: ×) for error notifications
 * - warning: Yellow color with ⚠ icon (fallback: ‼) for cautionary messages
 *
 * The component uses the tinky-theme system to resolve styling and
 * configuration, allowing for easy customization through theme extension.
 *
 * @example
 * Basic usage with message only:
 * ```tsx
 * import { Alert } from "tinky-alert";
 *
 * <Alert variant="info">
 *   This is an informational message
 * </Alert>
 * ```
 *
 * @example
 * Alert with title and message:
 * ```tsx
 * import { Alert } from "tinky-alert";
 *
 * <Alert variant="success" title="Success">
 *   Your operation completed successfully
 * </Alert>
 * ```
 *
 * @example
 * Error alert:
 * ```tsx
 * import { Alert } from "tinky-alert";
 *
 * <Alert variant="error" title="Error">
 *   Failed to connect to the server
 * </Alert>
 * ```
 *
 * @example
 * Warning alert:
 * ```tsx
 * import { Alert } from "tinky-alert";
 *
 * <Alert variant="warning" title="Warning">
 *   Your session will expire in 5 minutes
 * </Alert>
 * ```
 *
 * @see {@link AlertProps}
 * @see {@link alertTheme}
 */

import { JSX, type ReactNode } from "react";
import { Box, Text } from "tinky";
import { useFigures } from "tinky-figures";
import { useComponentTheme } from "tinky-theme";
import alertTheme, { type AlertThemeProps } from "../themes/alert-theme.js";

/**
 * Props for the Alert component.
 *
 * @interface AlertProps
 *
 * @property {ReactNode} children - The message content to display within the alert.
 *   This is the main body of the alert and can include text or any valid ReactNode.
 *   The message is rendered in normal (non-bold) text style for readability.
 *   Must be a valid ReactNode (components, elements, strings, numbers, etc.).
 *
 * @property {"info" | "success" | "error" | "warning"} variant - The alert variant
 *   determines the visual appearance including border color, icon, and semantic meaning.
 *
 *   Variant options and their meanings:
 *   - `info`: General information or neutral messages (blue border, ℹ icon / i fallback)
 *   - `success`: Successful operations or confirmations (green border, ✔ icon / √ fallback)
 *   - `error`: Error messages or failure notifications (red border, ✘ icon / × fallback)
 *   - `warning`: Warning messages or cautionary notes (yellow border, ⚠ icon / ‼ fallback)
 *
 *   Each variant has associated:
 *   - Border color around the alert container
 *   - Icon character displayed alongside the message
 *   - Semantic meaning for accessibility and understanding
 *
 * @property {string} [title] - Optional title text displayed above the message.
 *   When provided, the title is rendered in bold text above the message body,
 *   creating a clear visual hierarchy. The title should be a short, descriptive
 *   summary of the alert's purpose.
 *
 *   Title display characteristics:
 *   - Rendered in bold text for emphasis
 *   - Displayed above the message content
 *   - Optional - alert works without a title
 *   - Should be concise (typically 1-5 words)
 *
 * @example
 * Info alert with title and message:
 * ```tsx
 * const infoAlert: AlertProps = {
 *   variant: "info",
 *   title: "Information",
 *   children: "Your request was received successfully"
 * };
 * ```
 *
 * @example
 * Success alert without title:
 * ```tsx
 * const successAlert: AlertProps = {
 *   variant: "success",
 *   children: "All systems operational"
 * };
 * ```
 */
export interface AlertProps {
  /**
   * The message content to display within the alert.
   * This is the main body of the alert and can include text or any valid ReactNode.
   */
  readonly children: ReactNode;

  /**
   * The alert variant determines the visual appearance including border color, icon,
   * and semantic meaning.
   */
  readonly variant: "info" | "success" | "error" | "warning";

  /**
   * Optional title text displayed above the message in bold.
   */
  readonly title?: string;
}

/**
 * Alert component for displaying messages in terminal UIs.
 *
 * @param {AlertProps} props - Component props
 * @param {ReactNode} props.children - Message content to display
 * @param {"info" | "success" | "error" | "warning"} props.variant - Alert variant for styling
 * @param {string} [props.title] - Optional title displayed above message
 *
 * @returns {JSX.Element} The rendered alert component
 *
 * This is the main alert component that renders stylized message boxes with
 * variant-specific colors and icons for terminal applications.
 *
 * Component structure:
 * ```
 * ┌─────────────────────┐
 * │  [icon]  Title    │  <- icon container + content (title + message)
 * │          Message     │
 * └─────────────────────┘
 * ```
 *
 * Rendering behavior:
 * 1. Reads theme configuration for the Alert component
 * 2. Resolves variant-specific styles and icon mappings
 * 3. Renders a bordered container with variant-specific color
 * 4. Displays icon on the left side (non-shrinking)
 * 5. Displays content on the right side (flexible)
 * 6. Content contains optional bold title and message
 *
 * Theme integration:
 * - Uses `useComponentTheme` hook to resolve styles
 * - Styles come from `alertTheme.styles.*` functions
 * - Icon comes from `useFigures()` from `tinky-figures`
 * - Styles are applied to Box and Text components from tinky
 *
 * Flex layout behavior:
 * - Container fills available space (flexGrow: 1)
 * - Icon maintains fixed size (flexShrink: 0)
 * - Content can expand/shrink as needed
 * - Content stacks title above message (flexDirection: "column")
 *
 * @example
 * Simple info alert:
 * ```tsx
 * <Alert variant="info">
 *   System maintenance scheduled for tonight
 * </Alert>
 * ```
 *
 * @example
 * Success alert with title:
 * ```tsx
 * <Alert variant="success" title="Success">
 *   Your changes have been saved
 * </Alert>
 * ```
 *
 * @example
 * Error alert:
 * ```tsx
 * <Alert variant="error" title="Connection Error">
 *   Unable to reach the server. Please try again later.
 * </Alert>
 * ```
 *
 * @example
 * Warning alert:
 * ```tsx
 * <Alert variant="warning" title="Disk Space Low">
 *   You are using 90% of your available storage
 * </Alert>
 * ```
 *
 * @see {@link AlertProps}
 * @see {@link alertTheme}
 */
export function Alert({ children, variant, title }: AlertProps): JSX.Element {
  const props: AlertThemeProps = { variant };
  useComponentTheme<AlertThemeProps>("Alert", alertTheme, props);
  const figures = useFigures();
  const iconMap: Record<AlertProps["variant"], string> = {
    info: figures.info,
    success: figures.tick,
    error: figures.cross,
    warning: figures.warning,
  };
  const icon = iconMap[variant];

  return (
    <Box {...alertTheme.styles.container(props)}>
      <Box {...alertTheme.styles.iconContainer()}>
        <Text {...alertTheme.styles.icon(props)}>{icon}</Text>
      </Box>

      <Box {...alertTheme.styles.content()}>
        {title && <Text {...alertTheme.styles.title()}>{title}</Text>}
        <Text {...alertTheme.styles.message()}>{children}</Text>
      </Box>
    </Box>
  );
}
