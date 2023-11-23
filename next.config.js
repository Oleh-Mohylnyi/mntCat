/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "metadata.knowyourcat.id",
        port: "",
        pathname: "/v1/metadata/image/**",
      },
    ],
  },
  env: {
    GITCOIN_API_KEY: "cdSEWUts.smZtf4iu120GdXjcc14Je7V4AqNHo9C4",
    GITCOIN_SCORER_ID: "6096",
    GITCOIN_SCORER_URI: "https://www.scorer.gitcoin.co/dashboard/scorer/6096",
  },
};

module.exports = nextConfig;
