import { Track } from "@/types/Track";
import { convertRawTrackToTrack } from "./convert";
import { getTracks } from "@/lib/redis/getTracks";
import { rankTracksByScore } from "./rankTracksByScore";

let cachedTracks: Track[] | null = null;

export async function getRankedTracks() {
  if (cachedTracks) return cachedTracks;

  const rawTracks = await getTracks();
  const convertedTracks = await Promise.all(
    rawTracks.map(convertRawTrackToTrack)
  );
  const validTracks = convertedTracks.filter(
    (track): track is Track => track !== null
  );
  const ranked = rankTracksByScore(validTracks);

  cachedTracks = ranked; // 메모리에 저장
  return ranked;
}
