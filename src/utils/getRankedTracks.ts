import { Track } from "@/types/Track";
import { convertRawTrackToTrack } from "@/utils/convert";
import { getTracks } from "@/lib/redis/getTracks";
import { rankTracksByScore } from "@/utils/rankTracksByScore";

let cachedTracks: Track[] | null = null;

export const getRankedTracks = async () => {
  if (cachedTracks) return cachedTracks;

  const rawTracks = await getTracks();
  const convertedTracks = await Promise.all(
    rawTracks.map(convertRawTrackToTrack)
  );
  const validTracks = convertedTracks.filter(
    (track): track is Track => track !== null
  );
  const ranked = rankTracksByScore(validTracks);

  cachedTracks = ranked;
  return ranked;
};

export const clearTrackCache = () => {
  cachedTracks = null;
};
