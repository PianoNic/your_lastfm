function sanitizeAxiosConfig(config) {
  if (!config) return config;

  if (config.params?.api_key) {
    return {
      ...config,
      params: {
        ...config.params,
        api_key: "***REDACTED***"
      }
    };
  }

  return config;
}
module.exports = { sanitizeAxiosConfig };