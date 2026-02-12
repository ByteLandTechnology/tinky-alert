import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

interface PackageJson {
  readonly scripts?: Record<string, string>;
}

const readJson = <T>(filePath: string): T => {
  const content = readFileSync(filePath, "utf8");
  return JSON.parse(content) as T;
};

const listTestFiles = (directoryPath: string): string[] => {
  const entries = readdirSync(directoryPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listTestFiles(entryPath));
      continue;
    }
    if (
      entry.isFile() &&
      (entry.name.endsWith(".test.ts") || entry.name.endsWith(".test.tsx"))
    ) {
      files.push(entryPath);
    }
  }

  return files;
};

describe("testing toolchain", () => {
  it("uses vitest and enables coverage by default in the test script", () => {
    const packageJson = readJson<PackageJson>(
      join(process.cwd(), "package.json"),
    );
    const testScript = packageJson.scripts?.test ?? "";

    expect(testScript).toContain("vitest");
    expect(testScript).toContain("--coverage");
  });

  it("uses vitest test imports instead of bun:test in test files", () => {
    const testFiles = listTestFiles(join(process.cwd(), "tests"));
    expect(testFiles.length).toBeGreaterThan(0);

    for (const filePath of testFiles) {
      const content = readFileSync(filePath, "utf8");
      expect(content).not.toMatch(/^import\s+.*from ["']bun:test["'];?$/m);
      expect(content).toMatch(/^import\s+.*from ["']vitest["'];?$/m);
    }
  });
});
