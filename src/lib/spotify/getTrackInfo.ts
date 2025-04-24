import { createSpotifySdk } from ".";

export async function getTrackInfo(trackId: string) {
  try {
    const spotify = createSpotifySdk();
    const track = await spotify.tracks.get(trackId);
    return track;
  } catch (error) {
    console.error(`Failed to fetch track ${trackId}:`, error);
    return null;
  }
}
