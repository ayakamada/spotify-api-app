import axios from "axios";

//https://spotify-profile.herokuapp.com/

// ENDPOINTS ------------------------------------------------------------------------------
// tracks
const TOP_TRACKS_ENDPOINT_SHORT = `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term`; //last 4 weeks
const TOP_TRACKS_ENDPOINT_MEDIUM = `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term`; // last 6 months
export const TOP_TRACKS_ENDPOINT_LONG = `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term`; // several years of data

// artist
export const TOP_ARTISTS_ENDPOINT_SHORT = `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term`; //last 4 weeks
export const TOP_ARTISTS_ENDPOINT_MEDIUM = `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term`; //last 4 weeks
export const TOP_ARTISTS_ENDPOINT_LONG = `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term`; //last 4 weeks

// spotify api endpoint to get users top albums
export const USER_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/me/playlists`;

export const PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/playlists`;

// HELPERS ------------------------------------------------------------------------------

const fetcher = async (url, session, params = {}) => {
  // console.log(params);
  const res = await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      params: params,
    })
    .then((r) => r.data);

  return res;
};

//  * Get a User's Top Tracks
//  * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//  */
export const getTopTracksShort = async (session) => {
  return fetcher(TOP_TRACKS_ENDPOINT_SHORT, session);
};
export const getTopTracksMedium = async (session) => {
  return fetcher(TOP_TRACKS_ENDPOINT_MEDIUM, session);
};
export const getTopTracksLong = async (session) => {
  return fetcher(TOP_TRACKS_ENDPOINT_LONG, session);
};

/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export const getTopArtistsShort = async (session) => {
  return fetcher(TOP_ARTISTS_ENDPOINT_SHORT, session);
};

/**
 * Get a User's Playlist
 *  * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export const getUserPlayList = async (session) => {
  return fetcher(USER_PLAYLIST_ENDPOINT, session);
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist
 */
export const getPlayList = async (playlistId, session) => {
  return fetcher(`${PLAYLISTS_ENDPOINT}/${playlistId}`, session);
};

// TODO: separete the function later
/**
 * Get All Playlist items
 *https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
 */
export const getPlayListItems = async (playlistId, session) => {
  const limit = 50;
  let offset = 0;
  let allTracks = [];

  async function getTracks() {
    try {
      let response = await fetcher(`${PLAYLISTS_ENDPOINT}/${playlistId}/tracks`, session, {
        limit: limit,
        offset: offset,
      });

      allTracks = allTracks.concat(response.items);
      offset += limit;

      if (response.next !== null) {
        await getTracks(); // make another request if there are more tracks
      } else {
        // console.log(allTracks); // log all tracks once we have them all
      }
    } catch (error) {
      console.error(error);
    }

    return allTracks;
  }

  return getTracks();
};

/**
 * Returns a comma-separated list of track ids.
 *
 * @param {Array.<Object>} tracks - An array of track objects.
 * @returns {string} A comma-separated list of track ids.
 */

const getTrackIds = (tracks) => tracks.map(({ track }) => track.id).join(",");

/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
 */
export const getAudioFeaturesForTracks = async (tracks, session) => {
  const audioFeatures = [];
  const limit = 50;

  for (let i = 0; i < tracks.length; i += limit) {
    const ids = tracks
      .map(({ track }) => track.id)
      .slice(i, i + limit)
      .join(",");
    const response = await fetcher(`https://api.spotify.com/v1/audio-features?ids=${ids}`, session);
    audioFeatures.push(...response.audio_features);
  }

  return audioFeatures;
};
