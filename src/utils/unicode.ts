/**
 * Utility functions for Unicode support detection.
 *
 * Provides functionality to detect Unicode support in terminal environments
 * and provide appropriate fallback characters for unsupported environments.
 */

export function isUnicodeSupported(
  env: Record<string, string | undefined> = {},
): boolean {
  const lang = env.LANG || "";
  const hasUtf8Locale = lang.toLowerCase().includes("utf-8");

  const colorterm = env.COLORTERM || "";
  const termProgram = env.TERM_PROGRAM || "";
  const hasModernTerminal =
    colorterm.includes("truecolor") ||
    colorterm.includes("24bit") ||
    termProgram.includes("vscode") ||
    termProgram.includes("iTerm.app") ||
    termProgram.includes("Terminal.app");

  const platform = env.platform || "";
  const isWindows = platform === "win32";

  return hasUtf8Locale || hasModernTerminal || !isWindows || hasModernTerminal;
}
