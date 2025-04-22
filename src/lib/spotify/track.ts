import { createSpotifySdk } from ".";

export async function getTrackInfo(trackId: string) {
  const spotify = createSpotifySdk();
  const track = await spotify.tracks.get(trackId);
  return track;
}
