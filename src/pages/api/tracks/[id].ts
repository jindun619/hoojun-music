import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { RawTrack } from "@/types/RawTrack";

const TRACKS_KEY = "tracks";
const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid or missing ID in request" });
    }

    // 데이터 가져오기
    const data = (await redis.json.get(TRACKS_KEY)) as Record<string, RawTrack>;

    const key = Object.keys(data).find((k) => data[k].id === id);

    if (!key) {
      return res.status(404).json({ error: `Track with id ${id} not found` });
    }

    switch (req.method) {
      case "GET": {
        return res.status(200).json(data[key]);
      }

      case "PATCH": {
        if (!req.body || typeof req.body !== "object") {
          return res
            .status(400)
            .json({ error: "Invalid or missing request body" });
        }

        const updatedTrack: Partial<RawTrack> = req.body;
        const mergedTrack: RawTrack = {
          ...data[key],
          ...updatedTrack,
          scores: {
            ...data[key].scores,
            ...(updatedTrack.scores ?? {}),
          },
        };

        // @ts-ignore
        await redis.json.set(`${TRACKS_KEY}`, `$.${key}`, mergedTrack); //이 그지같은 ts 오류는 무시하자구
        return res
          .status(200)
          .json({ message: "Track updated", track: mergedTrack });
      }

      case "DELETE": {
        delete data[key];
        await redis.json.set(TRACKS_KEY, "$", data);
        return res.status(200).json({ message: `Track with id ${id} deleted` });
      }

      default: {
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        return res
          .status(405)
          .json({ error: `Method ${req.method} Not Allowed` });
      }
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
