import { createSpotifySdk } from ".";

export const getArtistInfo = async (artistId: string) => {
  const spotify = createSpotifySdk();
  const artist = await spotify.artists.get(artistId);
  return artist;
};
