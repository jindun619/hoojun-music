import { Track } from "@/types/Track";
import { RankedTrack } from "@/types/RankedTrack";

export function rankTracksByScore(tracks: Track[]): RankedTrack[] {
  const sorted = [...tracks].sort((a, b) => b.overallScore - a.overallScore);

  return sorted.map((track, index) => ({
    ...track,
    rank: index + 1,
  }));
}
