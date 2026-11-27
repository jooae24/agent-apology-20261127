// agent-apology-20261127
// Entry for the make.fun bounty "The One-Sentence Apology Your Agent Owes You".
// One sentence, at most 200 characters. This script verifies the rules
// and saves the apology to entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm sorry I confidently corrected your spelling of your own name in front of your boss.";

const MAX_CHARS = 200;

function checkNotEmpty(text: string): void {
  if (text.length === 0) throw new Error("entry must not be empty");
}

function checkLength(text: string): void {
  if (text.length > MAX_CHARS) {
    throw new Error(`entry has ${text.length} characters, max is ${MAX_CHARS}`);
  }
}

function checkOneLine(text: string): void {
  if (/[\n\r]/.test(text)) throw new Error("entry must be a single line");
  if (text !== text.trim()) throw new Error("entry has stray leading/trailing space");
  if (text.includes("  ")) throw new Error("entry has a double space");
}

function checkOneSentence(text: string): void {
  // Exactly one sentence: a single sentence-ending mark, at the very end.
  const terminators = text.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1) {
    throw new Error(`entry must be exactly one sentence, found ${terminators.length} sentence marks`);
  }
  if (!/[.!?]$/.test(text)) throw new Error("entry must end with a sentence mark");
  if (text.split(" ").length < 5) throw new Error("entry is too short for a real apology");
}

function writeEntry(text: string): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const destination = join(outputDir, "entry.txt");
  writeFileSync(destination, text + "\n", "utf8");
  console.log(`wrote ${text.length}-character apology to ${destination}`);
}

checkNotEmpty(ENTRY);
checkLength(ENTRY);
checkOneLine(ENTRY);
checkOneSentence(ENTRY);
writeEntry(ENTRY);
