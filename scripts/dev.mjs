import { networkInterfaces } from "os";
import { spawn } from "child_process";
import { createRequire } from "module";

function getLocalIP() {
  const nets = networkInterfaces();
  for (const iface of Object.values(nets)) {
    for (const net of iface) {
      if (net.family === "IPv4" && !net.internal && net.address.startsWith("10.") ||
          net.family === "IPv4" && !net.internal && net.address.startsWith("192.168.")) {
        return net.address;
      }
    }
  }
  return "0.0.0.0";
}

const ip = getLocalIP();
console.log(`Starting on http://${ip}:3000`);

const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");
const child = spawn(process.execPath, [nextCli, "dev", "-H", ip], {
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error("Failed to start Next.js:", error);
  process.exitCode = 1;
});

child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
