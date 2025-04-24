import { createSpotifySdk } from ".";

export const getTrackInfo = async (trackId: string) => {
  try {
    const spotify = createSpotifySdk();
    const track = await spotify.tracks.get(trackId);
    return track;
  } catch (error) {
    console.error(`Failed to fetch track ${trackId}:`, error);
    return null;
  }
};
