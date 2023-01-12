import { SECRET_LASTFM_KEY } from "$env/static/private";

export type Track = {
  artist: string;
  title: string;
  nowPlaying: boolean;
};

export const load = async ({ fetch }) => {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=kyleshepherd13&api_key=${SECRET_LASTFM_KEY}&format=json&limit=1`,
  );
  const data = await res.json();
  let track: Track;

  if (data?.recenttracks?.track?.length > 0) {
    track = {
      artist: data.recenttracks.track[0].artist["#text"],
      title: data.recenttracks.track[0].name,
      nowPlaying: data.recenttracks.track[0]["@attr"]?.nowplaying
        ? true
        : false,
    };
    return {
      track,
    };
  }
};
