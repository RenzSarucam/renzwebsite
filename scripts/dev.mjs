import { networkInterfaces } from "os";
import { spawn } from "child_process";

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

spawn("next", ["dev", "-H", ip], { stdio: "inherit", shell: true });
