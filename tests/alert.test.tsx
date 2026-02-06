/**
 * Basic rendering tests for Alert component.
 *
 * Basic tests for Alert component focusing on rendering output
 * and verifying variant-specific visual characteristics.
 */

import { test, expect, describe } from "bun:test";
import { Box } from "tinky";
import { render } from "tinky-test";
import ansi from "ansis";
import { Alert } from "../src/index.js";

describe("Alert", () => {
  test("success", () => {
    const { lastFrame } = render(
      <Box width={16}>
        <Alert variant="success" title="Success">
          Message
        </Alert>
      </Box>,
    );

    const output = lastFrame();
    expect(output).toContain(ansi.green("✅"));
    expect(output).toContain(ansi.bold("Success"));
    expect(output).toContain("Message");
  });

  test("error", () => {
    const { lastFrame } = render(
      <Box width={16}>
        <Alert variant="error" title="Error">
          Message
        </Alert>
      </Box>,
    );

    const output = lastFrame();
    expect(output).toContain(ansi.red("❌"));
    expect(output).toContain(ansi.bold("Error"));
    expect(output).toContain("Message");
  });

  test("warning", () => {
    const { lastFrame } = render(
      <Box width={16}>
        <Alert variant="warning" title="Warning">
          Message
        </Alert>
      </Box>,
    );

    const output = lastFrame();
    expect(output).toContain(ansi.yellow("⚠️"));
    expect(output).toContain(ansi.bold("Warning"));
    expect(output).toContain("Message");
  });

  test("info", () => {
    const { lastFrame } = render(
      <Box width={16}>
        <Alert variant="info" title="Info">
          Message
        </Alert>
      </Box>,
    );

    const output = lastFrame();
    expect(output).toContain(ansi.blue("ℹ️"));
    expect(output).toContain(ansi.bold("Info"));
    expect(output).toContain("Message");
  });

  test("renders without title", () => {
    const { lastFrame } = render(
      <Alert variant="success">Message without title</Alert>,
    );

    const output = lastFrame();
    expect(output).toContain(ansi.green("✅"));
    expect(output).toContain("Message without title");
  });

  test("renders with empty title", () => {
    const { lastFrame } = render(
      <Alert variant="error" title="">
        Message with empty title
      </Alert>,
    );

    const output = lastFrame();
    expect(output).toBeDefined();
  });

  test("renders with long message", () => {
    const longMessage =
      "This is a very long message that should be wrapped " +
      "properly within the alert container for testing.";
    const { lastFrame } = render(
      <Alert variant="warning" title="Warning">
        {longMessage}
      </Alert>,
    );

    const output = lastFrame();
    expect(output).toContain(ansi.yellow("⚠️"));
    expect(output).toContain("very long message");
  });

  test("renders with special characters", () => {
    const specialMessage =
      "Message with special chars: @#$%^&*()_+-=[]{}|;:'\",.<>/?";
    const { lastFrame } = render(
      <Alert variant="info">{specialMessage}</Alert>,
    );

    const output = lastFrame();
    expect(output).toContain("special chars");
  });

  test("renders with unicode characters", () => {
    const unicodeMessage = "Unicode: ℹ️ ✓ ✗ ⚠️ 😊 🎉";
    const { lastFrame } = render(
      <Alert variant="success">{unicodeMessage}</Alert>,
    );

    const output = lastFrame();
    expect(output).toBeDefined();
  });
});
