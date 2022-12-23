const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  sentry: {
    hideSourceMaps: false,
  },
  reactStrictMode: true,
  swcMinify: false,
  ignoreDuringBuilds: true,
  staticPageGenerationTimeout: 1000,
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
