import { Track } from "@/types/Track";
import { RawTrack } from "@/types/RawTrack";
import { getTrackInfo } from "@/lib/spotify/track";

export const convertRawTrackToTrack = async (
  rawTrack: RawTrack
): Promise<Track> => {
  const trackData = await getTrackInfo(rawTrack.trackId);

  const trackName = trackData.name;
  const artistName = trackData.artists
    .map((artist: { name: string }) => artist.name)
    .join(", ");
  const albumImgUrl = trackData.album.images?.[0]?.url ?? "";

  const scoreValues = Object.values(rawTrack.scores);
  const total = scoreValues.reduce((sum, val) => sum + val, 0);
  const overallScore = parseFloat((total / scoreValues.length).toFixed(2));

  const convertedScores = {
    structure: rawTrack.scores.structure,
    lyrics: rawTrack.scores.lyrics,
    production: rawTrack.scores.production,
    performance: rawTrack.scores.performance,
    originality: rawTrack.scores.originality,
    melody_rhythm: rawTrack.scores.melody_rhythm,
    emotion: rawTrack.scores.emotion,
  };

  const converted: Track = {
    id: rawTrack.id,
    trackId: rawTrack.trackId,
    trackName,
    artistName,
    albumImgUrl,
    overallScore,
    scores: convertedScores,
  };

  return converted;
};
