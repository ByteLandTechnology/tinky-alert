/**
 * Full integration test suite for Alert component.
 *
 * Comprehensive integration tests for Alert component including
 * rendering, theme integration, and component composition scenarios.
 */

import { describe, it, expect } from "vitest";
import { render } from "tinky-test";
import ansi from "ansis";
import {
  asciiFigures,
  isUnicodeSupported,
  unicodeFigures,
} from "tinky-figures";
import { Alert, alertTheme } from "../src/index.js";

const figures = isUnicodeSupported(process.platform, process.env)
  ? unicodeFigures
  : asciiFigures;

const iconByVariant = {
  info: figures.info,
  success: figures.tick,
  error: figures.cross,
  warning: figures.warning,
} as const;

describe("Full Integration Tests", () => {
  describe("complete alert rendering", () => {
    it("should render complete alert with all props", () => {
      const { lastFrame } = render(
        <Alert variant="info" title="Information">
          This is a complete alert with title and message
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toContain(ansi.blue(iconByVariant.info));
      expect(output).toContain(ansi.bold("Information"));
      expect(output).toContain(
        "This is a complete alert with title and message",
      );
    });

    it("should render all four variants", () => {
      const variants = [
        { variant: "info", title: "Info" },
        { variant: "success", title: "Success" },
        { variant: "error", title: "Error" },
        { variant: "warning", title: "Warning" },
      ] as const;

      for (const { variant, title } of variants) {
        const { lastFrame } = render(
          <Alert variant={variant} title={title}>
            Message
          </Alert>,
        );

        const output = lastFrame();
        expect(output).toBeDefined();
        expect(typeof output).toBe("string");
        expect(output.length).toBeGreaterThan(0);
      }
    });
  });

  describe("alert content scenarios", () => {
    it("should render single-line message", () => {
      const { lastFrame } = render(
        <Alert variant="info">Single line message</Alert>,
      );

      const output = lastFrame();
      expect(output).toContain("Single line message");
    });

    it("should render multi-line message", () => {
      const { lastFrame } = render(
        <Alert variant="success">
          First line of message Second line of message Third line of message
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toContain("First line of message");
      expect(output).toContain("Second line of message");
      expect(output).toContain("Third line of message");
    });

    it("should render long message text", () => {
      const longMessage =
        "This is a very long message that should wrap properly in a alert container. " +
        "The alert should handle multi-line text without breaking the layout. " +
        "Long messages are common in real-world CLI applications.";
      const { lastFrame } = render(<Alert variant="info">{longMessage}</Alert>);

      const output = lastFrame();
      expect(output).toContain("very long message");
    });

    it("should render message without title", () => {
      const { lastFrame } = render(
        <Alert variant="warning">Message without title</Alert>,
      );

      const output = lastFrame();
      expect(output).toContain("Message without title");
      expect(output).not.toContain("Warning");
    });

    it("should render short title with message", () => {
      const { lastFrame } = render(
        <Alert variant="error" title="OK">
          Status message
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toContain(ansi.bold("OK"));
      expect(output).toContain("Status message");
    });

    it("should render long title with message", () => {
      const longTitle =
        "This is a very long title that should fit in the alert";
      const { lastFrame } = render(
        <Alert variant="success" title={longTitle}>
          Message content
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toContain(ansi.bold(longTitle));
    });
  });

  describe("variant-specific rendering", () => {
    it("should render info variant with correct styling", () => {
      const { lastFrame } = render(
        <Alert variant="info" title="Info">
          Informational message
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toContain(ansi.blue(iconByVariant.info));
      expect(output).toContain(ansi.bold("Info"));
      expect(output).toContain("Informational message");
    });

    it("should render success variant with correct styling", () => {
      const { lastFrame } = render(
        <Alert variant="success" title="Success">
          Success message
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toContain(ansi.green(iconByVariant.success));
      expect(output).toContain(ansi.bold("Success"));
      expect(output).toContain("Success message");
    });

    it("should render error variant with correct styling", () => {
      const { lastFrame } = render(
        <Alert variant="error" title="Error">
          Error message
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toContain(ansi.red(iconByVariant.error));
      expect(output).toContain(ansi.bold("Error"));
      expect(output).toContain("Error message");
    });

    it("should render warning variant with correct styling", () => {
      const { lastFrame } = render(
        <Alert variant="warning" title="Warning">
          Warning message
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toContain(ansi.yellow(iconByVariant.warning));
      expect(output).toContain(ansi.bold("Warning"));
      expect(output).toContain("Warning message");
    });
  });

  describe("theme structure verification", () => {
    it("should have all required style functions", () => {
      const requiredStyles = [
        "container",
        "iconContainer",
        "icon",
        "content",
        "title",
        "message",
      ] as const;

      for (const styleName of requiredStyles) {
        expect(alertTheme.styles).toHaveProperty(styleName);
        expect(typeof alertTheme.styles[styleName]).toBe("function");
      }
    });
  });

  describe("layout and composition", () => {
    it("should handle empty message gracefully", () => {
      const { lastFrame } = render(
        <Alert variant="info" title="Empty">
          {""}
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toBeDefined();
    });

    it("should handle message with only whitespace", () => {
      const { lastFrame } = render(
        <Alert variant="warning" title="Warning">
          {"   "}
        </Alert>,
      );

      const output = lastFrame();
      expect(output).toBeDefined();
    });

    it("should handle special characters in message", () => {
      const specialMessage =
        "Message with special chars: !@#$%^&*()_+-=[]{}|;:'\",.<>/?";
      const { lastFrame } = render(
        <Alert variant="error">{specialMessage}</Alert>,
      );

      const output = lastFrame();
      expect(output).toContain("special chars");
    });

    it("should handle unicode characters", () => {
      const unicodeMessage = "Unicode: ℹ️ ✓ ✗ ⚠️ 😊 🎉 🚀 💻";
      const { lastFrame } = render(
        <Alert variant="info">{unicodeMessage}</Alert>,
      );

      const output = lastFrame();
      expect(output).toBeDefined();
    });
  });

  describe("component API consistency", () => {
    it("should accept all required props", () => {
      const element = (
        <Alert variant="success" title="Complete">
          Test
        </Alert>
      );

      expect(element.props.variant).toBe("success");
      expect(element.props.title).toBe("Complete");
      expect(element.props.children).toBe("Test");
    });

    it("should work without optional title prop", () => {
      const element = <Alert variant="info">No title</Alert>;

      expect(element.props.variant).toBe("info");
      expect(element.props.title).toBeUndefined();
      expect(element.props.children).toBe("No title");
    });
  });
});
