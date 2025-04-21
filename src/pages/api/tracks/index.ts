import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { TrackDTO } from "@/types/dto/TrackDTO";

const TRACKS_KEY = "tracks";
const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await redis.json.get(TRACKS_KEY);
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const newTrack: TrackDTO = req.body;
    const currentData = (await redis.json.get(TRACKS_KEY)) ?? {};

    const newId = (Object.keys(currentData).length + 1).toString();

    const updatedData = {
      ...currentData,
      [newId]: {
        id: newId,
        ...newTrack,
      },
    };

    await redis.json.set(TRACKS_KEY, "$", updatedData);

    return res.status(201).json({ message: "Track added", id: newId });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
