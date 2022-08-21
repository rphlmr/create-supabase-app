#!/usr/bin/env node

require("esbuild")
  .build({
    entryPoints: ["./src/entry.tsx"],
    external: ["./node_modules/*"],
    outfile: "dist/app.js",
    platform: "node",
    bundle: true,
  })
  .then(() => {
    console.log("⚡ Done");
  })
  .catch(() => process.exit(1));
