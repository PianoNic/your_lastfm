const axios = require("axios");
require("dotenv").config();
const { fetchWithRetry } = require("../utils/fetchRetry");

const LASTFM_URL = "https://ws.audioscrobbler.com/2.0/";

async function getTrackDuration(artist, track) {
  try {
    const response = await fetchWithRetry(() =>
      axios.get(LASTFM_URL, {
        params: {
          method: "track.getInfo",
          api_key: process.env.LASTFM_API_KEY,
          artist,
          track,
          format: "json"
        }
      })
    );

    const durationMs = Number(response.data?.track?.duration);

    if (!durationMs || durationMs <= 0) return null;

    return Math.round(durationMs / 1000);

  } catch {
    return null;
  }
}

module.exports = { getTrackDuration };
