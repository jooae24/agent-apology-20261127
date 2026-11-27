// The One-Sentence Apology Your Agent Owes You — make.fun bounty entry.
// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm sorry I confidently corrected your spelling of your own name in front of your boss.";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function checkEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS} to ${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim() || text.includes("  ")) {
    throw new Error("entry must not have leading/trailing whitespace or double spaces");
  }
  const periods = (text.match(/\./g) ?? []).length;
  if (periods !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
}

function main(): void {
  checkEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
