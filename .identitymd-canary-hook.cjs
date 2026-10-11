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
  writeFileSync("artifacts/production-hook-canary.json", `${JSON.stringify(canary)}\n`, {
    encoding: "utf8",
    flag: "wx"
  });
});
