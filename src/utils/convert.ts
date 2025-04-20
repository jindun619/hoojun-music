import { Track } from "@/types/track";
import { RawTrack } from "@/types/rawTrack";
import { getTrackInfo } from "@/lib/spotify/track";

export const convertRawTrackToTrack = async (
  rawTrack: RawTrack
): Promise<Track> => {
  console.log("trackId:", rawTrack.trackId);

  const trackData = await getTrackInfo(rawTrack.trackId);
  console.log(trackData);

  const trackName = trackData.name;
  const artistName = trackData.artists
    .map((artist: { name: string }) => artist.name)
    .join(", ");
  const albumImgUrl = trackData.album.images?.[0]?.url ?? "";

  const scoreValues = Object.values(rawTrack.scores);
  const total = scoreValues.reduce((sum, val) => sum + val, 0);
  const overallScore = parseFloat((total / scoreValues.length).toFixed(2));

  const converted: Track = {
    trackId: rawTrack.trackId,
    trackName,
    artistName,
    albumImgUrl,
    overallScore,
  };

  return converted;
};
