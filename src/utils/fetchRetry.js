async function fetchWithRetry(fn, retries = 5, delay = 2000) {
  try {
    return await fn();
  } catch (err) {
    const status = err.response?.status;

    if (retries > 0 && (status === 500 || status === 502 || status === 503)) {
      console.warn(
        `⚠️ Last.fm temporary error (${status}). Retrying in ${delay}ms... (${retries} retries left)`
      );
      await new Promise(r => setTimeout(r, delay));
      return fetchWithRetry(fn, retries - 1, delay * 1.5);
    }

    throw err;
  }
}

module.exports = { fetchWithRetry };