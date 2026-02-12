/**
 * Test suite for Alert component variants.
 *
 * Tests for Alert component focusing on different variant types,
 * their visual characteristics, and semantic meanings.
 */

import { describe, it, expect } from "vitest";
import { Box } from "tinky";
import { ThemeProvider, extendTheme, defaultTheme } from "tinky-theme";
import { Alert } from "../src/index.js";

describe("Alert Variants", () => {
  describe("info variant", () => {
    it("should render info variant correctly", () => {
      const element = (
        <Alert variant="info">This is an informational message</Alert>
      );

      expect(element).toBeDefined();
      expect(element.props.variant).toBe("info");
    });

    it("should use blue color for info variant", () => {
      const element = <Alert variant="info">Info message</Alert>;

      expect(element.props.variant).toBe("info");
    });

    it("should work with title for info variant", () => {
      const element = (
        <Alert variant="info" title="Information">
          This is info
        </Alert>
      );

      expect(element.props.title).toBe("Information");
    });
  });

  describe("success variant", () => {
    it("should render success variant correctly", () => {
      const element = <Alert variant="success">Operation successful</Alert>;

      expect(element).toBeDefined();
      expect(element.props.variant).toBe("success");
    });

    it("should use green color for success variant", () => {
      const element = <Alert variant="success">Success</Alert>;

      expect(element.props.variant).toBe("success");
    });

    it("should work with title for success variant", () => {
      const element = (
        <Alert variant="success" title="Success">
          Completed
        </Alert>
      );

      expect(element.props.title).toBe("Success");
    });
  });

  describe("error variant", () => {
    it("should render error variant correctly", () => {
      const element = <Alert variant="error">An error occurred</Alert>;

      expect(element).toBeDefined();
      expect(element.props.variant).toBe("error");
    });

    it("should use red color for error variant", () => {
      const element = <Alert variant="error">Failed operation</Alert>;

      expect(element.props.variant).toBe("error");
    });

    it("should work with title for error variant", () => {
      const element = (
        <Alert variant="error" title="Error">
          Failed
        </Alert>
      );

      expect(element.props.title).toBe("Error");
    });
  });

  describe("warning variant", () => {
    it("should render warning variant correctly", () => {
      const element = <Alert variant="warning">Warning message</Alert>;

      expect(element).toBeDefined();
      expect(element.props.variant).toBe("warning");
    });

    it("should use yellow color for warning variant", () => {
      const element = <Alert variant="warning">Warning</Alert>;

      expect(element.props.variant).toBe("warning");
    });

    it("should work with title for warning variant", () => {
      const element = (
        <Alert variant="warning" title="Warning">
          Be careful
        </Alert>
      );

      expect(element.props.title).toBe("Warning");
    });
  });

  describe("variant combinations", () => {
    it("should support all four variants", () => {
      const variants = ["info", "success", "error", "warning"] as const;
      for (const variant of variants) {
        const element = <Alert variant={variant}>Test message</Alert>;
        expect(element).toBeDefined();
        expect(element.props.variant).toBe(variant);
      }
    });

    it("should support title with all variants", () => {
      const variants = ["info", "success", "error", "warning"] as const;
      for (const variant of variants) {
        const element = (
          <Alert variant={variant} title={`${variant} title`}>
            Message
          </Alert>
        );
        expect(element.props.title).toBe(`${variant} title`);
      }
    });

    it("should support title omission with all variants", () => {
      const variants = ["info", "success", "error", "warning"] as const;
      for (const variant of variants) {
        const element = <Alert variant={variant}>Message without title</Alert>;
        expect(element.props.title).toBeUndefined();
      }
    });
  });

  describe("theme integration", () => {
    it("should work with default theme", () => {
      const element = (
        <ThemeProvider theme={defaultTheme}>
          <Alert variant="success">Success</Alert>
        </ThemeProvider>
      );

      expect(element).toBeDefined();
    });

    it("should support custom theme with all variants", () => {
      const variants = ["info", "success", "error", "warning"] as const;
      const customTheme = extendTheme(defaultTheme, {
        components: {
          Alert: {
            styles: {
              container: () => ({
                borderStyle: "double",
              }),
            },
          },
        },
      });

      for (const variant of variants) {
        const element = (
          <ThemeProvider theme={customTheme}>
            <Alert variant={variant}>Custom styled</Alert>
          </ThemeProvider>
        );
        expect(element).toBeDefined();
      }
    });
  });

  describe("content types", () => {
    it("should support string content with all variants", () => {
      const variants = ["info", "success", "error", "warning"] as const;
      for (const variant of variants) {
        const element = <Alert variant={variant}>String content</Alert>;
        expect(element).toBeDefined();
      }
    });

    it("should support element content with all variants", () => {
      const variants = ["info", "success", "error", "warning"] as const;
      for (const variant of variants) {
        const element = (
          <Alert variant={variant}>
            <Box>Element content</Box>
          </Alert>
        );
        expect(element).toBeDefined();
      }
    });
  });
});
