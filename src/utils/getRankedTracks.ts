import { Track } from "@/types/Track";
import { convertRawTrackToTrack } from "./convert";
import { getTracks } from "@/lib/redis/getTracks";
import { rankTracksByScore } from "./rankTracksByScore";

let cachedTracks: Track[] | null = null;

export async function getRankedTracks() {
  if (cachedTracks) return cachedTracks; // ✅ 이미 계산된 값이 있다면 반환

  const rawTracks = await getTracks();
  const converted = await Promise.all(rawTracks.map(convertRawTrackToTrack));
  const ranked = rankTracksByScore(converted);

  cachedTracks = ranked; // ✅ 메모리에 저장
  return ranked;
}
