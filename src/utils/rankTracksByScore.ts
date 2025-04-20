import { Track } from "@/types/track";
import { RankedTrack } from "@/types/rankedTrack";

export function rankTracksByScore(tracks: Track[]): RankedTrack[] {
  const sorted = [...tracks].sort((a, b) => b.overallScore - a.overallScore);

  return sorted.map((track, index) => ({
    ...track,
    rank: index + 1,
  }));
}
