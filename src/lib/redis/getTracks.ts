import { Redis } from "@upstash/redis";
import { RawTrack } from "@/types/rawTrack";

const redis = Redis.fromEnv();

export const getTracks = async (): Promise<RawTrack[]> => {
  try {
    const result = (await redis.json.get("tracks", "$")) as RawTrack[];

    if (!result || !Array.isArray(result) || result.length === 0) {
      return [];
    }

    const tracks = Object.values(result[0]) as RawTrack[];
    return tracks;
  } catch (error) {
    console.error("Redis Error in getTracks:", error);
    return [];
  }
};
