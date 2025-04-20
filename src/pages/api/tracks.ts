import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const result = await redis.json.get("tracks", "$");

    if (!result || !Array.isArray(result) || result.length === 0) {
      return res.status(404).json({ success: false, error: "No tracks found" });
    }

    const tracks = Object.values(result[0]);

    return res.status(200).json({ success: true, data: tracks });
  } catch (error: any) {
    console.error("Redis Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
