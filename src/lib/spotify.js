import axios from "axios";

// ENDPOINTS ------------------------------------------------------------------------------
const TOP_TRACKS_ENDPOINT_SHORT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_TRACKS_ENDPOINT_MEDIUM = `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term`;
export const TOP_TRACKS_ENDPOINT_LONG = `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopTracksShort = async (session) => {
  const res = await fetch(TOP_TRACKS_ENDPOINT_SHORT, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  }).then((res) => res.json());

  return res;
};
