/**
 * Test suite for main index exports.
 *
 * Tests for main package exports from src/index.ts, ensuring all
 * public APIs are properly exported and accessible.
 */

import { describe, it, expect } from "bun:test";
import {
  Alert,
  type AlertProps,
  alertTheme,
  type AlertTheme,
} from "../src/index.js";

describe("Package Exports", () => {
  describe("components", () => {
    it("should export Alert component", () => {
      expect(Alert).toBeDefined();
      expect(typeof Alert).toBe("function");
    });
  });

  describe("types", () => {
    it("should export AlertProps type", () => {
      const props: AlertProps = {
        variant: "info",
        children: "Test message",
      };
      expect(props.variant).toBe("info");
      expect(props.children).toBe("Test message");
    });

    it("should support all variant types in AlertProps", () => {
      const variants = [
        "info",
        "success",
        "error",
        "warning",
      ] as AlertProps["variant"][];
      expect(variants).toHaveLength(4);
    });

    it("should support optional title in AlertProps", () => {
      const propsWithTitle: AlertProps = {
        variant: "success",
        children: "Message",
        title: "Title",
      };
      expect(propsWithTitle.title).toBe("Title");

      const propsWithoutTitle: AlertProps = {
        variant: "error",
        children: "Message",
      };
      expect(propsWithoutTitle.title).toBeUndefined();
    });
  });

  describe("theme exports", () => {
    it("should export alertTheme", () => {
      expect(alertTheme).toBeDefined();
      expect(typeof alertTheme).toBe("object");
    });

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

    it("should export AlertTheme type", () => {
      // Type-level test - ensure theme type can be used
      const theme: AlertTheme = alertTheme;
      expect(theme).toBeDefined();
    });

    it("should have matching type definitions", () => {
      const theme = alertTheme;
      expect(theme).toHaveProperty("styles");
    });
  });

  describe("integration verification", () => {
    it("should return valid style props for all variants", () => {
      const variants = ["info", "success", "error", "warning"] as const;
      for (const variant of variants) {
        const props = { variant };
        const containerStyles = alertTheme.styles.container(props);
        const iconStyles = alertTheme.styles.icon(props);

        expect(containerStyles).toHaveProperty("borderColor");
        expect(iconStyles).toHaveProperty("color");
      }
    });
  });
});
