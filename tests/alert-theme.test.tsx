/**
 * Test suite for Alert theme configuration.
 *
 * Comprehensive tests for alert theme configuration including
 * style functions, variant-specific settings, and color mappings.
 */

import { describe, it, expect } from "bun:test";
import { alertTheme } from "../src/index.js";

describe("alertTheme", () => {
  describe("theme structure", () => {
    it("should have styles property", () => {
      expect(alertTheme).toHaveProperty("styles");
      expect(typeof alertTheme.styles).toBe("object");
    });
  });

  describe("style functions", () => {
    describe("container styles", () => {
      it("should return container styles for info variant", () => {
        const styles = alertTheme.styles.container({ variant: "info" });
        expect(styles).toHaveProperty("flexGrow", 1);
        expect(styles).toHaveProperty("borderStyle", "round");
        expect(styles).toHaveProperty("borderColor", "blue");
        expect(styles).toHaveProperty("gap", 1);
        expect(styles).toHaveProperty("paddingX", 1);
      });

      it("should return container styles for success variant", () => {
        const styles = alertTheme.styles.container({ variant: "success" });
        expect(styles.borderColor).toBe("green");
      });

      it("should return container styles for error variant", () => {
        const styles = alertTheme.styles.container({ variant: "error" });
        expect(styles.borderColor).toBe("red");
      });

      it("should return container styles for warning variant", () => {
        const styles = alertTheme.styles.container({ variant: "warning" });
        expect(styles.borderColor).toBe("yellow");
      });
    });

    describe("iconContainer styles", () => {
      it("should return iconContainer styles", () => {
        const styles = alertTheme.styles.iconContainer();
        expect(styles).toHaveProperty("flexShrink", 0);
        expect(Object.keys(styles)).toHaveLength(1);
      });
    });

    describe("icon styles", () => {
      it("should return icon styles for info variant", () => {
        const styles = alertTheme.styles.icon({ variant: "info" });
        expect(styles).toHaveProperty("color", "blue");
      });

      it("should return icon styles for success variant", () => {
        const styles = alertTheme.styles.icon({ variant: "success" });
        expect(styles).toHaveProperty("color", "green");
      });

      it("should return icon styles for error variant", () => {
        const styles = alertTheme.styles.icon({ variant: "error" });
        expect(styles).toHaveProperty("color", "red");
      });

      it("should return icon styles for warning variant", () => {
        const styles = alertTheme.styles.icon({ variant: "warning" });
        expect(styles).toHaveProperty("color", "yellow");
      });
    });

    describe("content styles", () => {
      describe("title styles", () => {
        it("should return title styles", () => {
          const styles = alertTheme.styles.title();
          expect(styles).toHaveProperty("bold", true);
          expect(Object.keys(styles)).toHaveLength(1);
        });
      });

      describe("message styles", () => {
        it("should return message styles", () => {
          const styles = alertTheme.styles.message();
          expect(Object.keys(styles)).toHaveLength(0);
        });
      });
    });
  });
});
