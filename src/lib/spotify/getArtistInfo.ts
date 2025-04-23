import { createSpotifySdk } from ".";

export async function getArtistInfo(artistId: string) {
  const spotify = createSpotifySdk();
  const artist = await spotify.artists.get(artistId);
  return artist;
}
