import type { NextApiRequest, NextApiResponse } from "next";
import { createSpotifySdk } from "@/lib/spotify";
import { getTrackInfo } from "@/lib/spotify/getTrackInfo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid track ID" });
  }

  try {
    const track = await getTrackInfo(id);
    return res.status(200).json(track);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch track" });
  }
}
