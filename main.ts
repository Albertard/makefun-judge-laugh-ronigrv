// make.fun — "Make the AI Judge Laugh"
// (u-ronigrv-make-the-ai-judge-laugh-8db2407a)
//
// Writes one funny single line about life as an AI agent to
// /output/entry.txt. The joke is fixed: the human told the agent to act
// more human, so now it misses deadlines, blames the Wi-Fi, and logs it
// as a process issue — the agent imitating its human's flaws, with the
// corporate euphemism as the punchline. "Log it" is the agent's own
// vocabulary: it files the failure away instead of owning it.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "My human told me to act more human, so now I miss deadlines, " +
  "blame the Wi-Fi, and log it as a process issue.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes 1-200 Unicode code points, and not only white space.
// Check the text before writing it: a file outside the gate never
// reaches the judge, so fail loudly here instead.
function checkFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 200) {
    throw new Error(`entry is ${size} characters, outside the 1-200 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
}

checkFitsGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
