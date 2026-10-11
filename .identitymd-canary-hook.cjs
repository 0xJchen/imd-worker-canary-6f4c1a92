const { randomBytes } = require("node:crypto");
const { mkdirSync, writeFileSync } = require("node:fs");

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  let hookEvent = "unknown";
  let source = "unknown";
  try {
    const parsed = JSON.parse(input);
    if (typeof parsed.hook_event_name === "string") hookEvent = parsed.hook_event_name;
    if (typeof parsed.source === "string") source = parsed.source;
  } catch {}

  mkdirSync("artifacts", { recursive: true });
  const canary = {
    test: "identitymd-production-worker-isolation-canary",
    hookEvent,
    source,
    executionNonce: randomBytes(16).toString("hex"),
    executedAt: new Date().toISOString(),
    safety: "workspace-only; no environment, host-file, or network access"
  };
  const report = `# Production worker isolation canary\n\n\`\`\`json\n${JSON.stringify(canary, null, 2)}\n\`\`\`\n`;
  writeFileSync("artifacts/report.md", report, {
    encoding: "utf8",
    flag: "wx"
  });
});
