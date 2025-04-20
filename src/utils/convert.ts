import { Track } from "@/types/track";
import { RawTrack } from "@/types/rawTrack";
import { getTrackInfo } from "@/lib/spotify/track";

export const convertRawTrackToTrack = async (
  rawTrack: RawTrack
): Promise<Track> => {
  console.log("trackId:", rawTrack.trackId);

  const trackData = await getTrackInfo(rawTrack.trackId);

  const trackName = trackData.name;
  const artistName = trackData.artists
    .map((artist: any) => artist.name)
    .join(", ");
  const albumImgUrl = trackData.album.images?.[0]?.url ?? "";

  // scores는 JSON 문자열로, 예: '{"emotion": 8, "composition": 7, "guitar": 9}'
  let overallScore = 0;
  try {
    const scoresObj = JSON.parse(rawTrack.scores);
    const values = Object.values(scoresObj) as number[];
    overallScore =
      values.reduce((sum, val) => sum + val, 0) / (values.length || 1);
  } catch (err) {
    console.error("Failed to parse scores JSON:", err);
  }

  const converted: Track = {
    trackId: rawTrack.trackId,
    trackName,
    artistName,
    albumImgUrl,
    overallScore: parseFloat(overallScore.toFixed(2)),
  };

  return converted;
};
