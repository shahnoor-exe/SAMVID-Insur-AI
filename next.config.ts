import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: __dirname, // Pin the project root so Turbopack ignores parent lockfiles
  },
};

export default nextConfig;
