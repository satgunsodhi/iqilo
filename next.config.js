/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/leetcode/graphql",
        destination: "https://leetcode.com/graphql",
      },
    ];
  },
};

module.exports = nextConfig;
