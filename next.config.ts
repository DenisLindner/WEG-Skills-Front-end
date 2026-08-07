import type { NextConfig } from "next";

const quickTunnelEnabled = process.env.QUICK_TUNNEL === "true";
const quickTunnelOrigins = ["*.trycloudflare.com"];

const nextConfig: NextConfig = {
  reactCompiler: true,
  ...(quickTunnelEnabled && {
    allowedDevOrigins: quickTunnelOrigins,
  }),
  experimental: {
    useTypeScriptCli: false,
    ...(quickTunnelEnabled && {
      serverActions: {
        allowedOrigins: quickTunnelOrigins,
      },
    }),
  },
};

export default nextConfig;
