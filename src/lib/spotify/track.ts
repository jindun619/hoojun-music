import { createSpotifySdk } from ".";

export async function getTrackInfo(trackId: string) {
  const spotify = createSpotifySdk();
  console.log("sdk instance initialized successfully");
  const track = await spotify.tracks.get(trackId);
  return track;
}
