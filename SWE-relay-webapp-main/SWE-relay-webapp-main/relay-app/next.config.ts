import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ASSEMBLYAI_API_KEY: process.env.ASSEMBLYAI_API_KEY,
  }
};

export default nextConfig;
