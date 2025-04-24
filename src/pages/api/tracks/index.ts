import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { TrackCreateDTO } from "@/types/dto/TrackCreateDTO";
import { RawTrack } from "@/types/RawTrack";

const TRACKS_KEY = "tracks";
const redis = Redis.fromEnv();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const data = (await redis.json.get(TRACKS_KEY)) as Record<string, RawTrack>;
    const trackArray = Object.values(data);
    return res.status(200).json(trackArray);
  }

  if (req.method === "POST") {
    try {
      const newTrack: TrackCreateDTO = req.body;
      const data = (await redis.json.get(TRACKS_KEY)) as Record<
        string,
        RawTrack
      >;
      const trackArray = Object.values(data);

      // 새로운 ID는 기존 마지막 ID + 1
      const lastId = trackArray.at(-1)?.id ?? "-1";
      const newId = (parseInt(lastId) + 1).toString();

      const updatedData = {
        ...data,
        [newId]: {
          id: newId,
          ...newTrack,
        },
      };

      await redis.json.set(TRACKS_KEY, "$", updatedData);

      return res
        .status(201)
        .json({ message: "Track added", track: { id: newId, ...newTrack } });
    } catch (error) {
      console.error("Error adding track:", error);
      return res.status(500).json({ message: "Failed to add track" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
};

export default handler;
