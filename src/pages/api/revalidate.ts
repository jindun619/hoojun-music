// pages/api/revalidate.ts
import { clearTrackCache } from "@/utils/getRankedTracks";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, id } = req.query;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  try {
    // 캐시 비우기
    clearTrackCache();

    // ISR 리빌드 트리거
    await res.revalidate(`/tracks/${id}`);

    return res.json({ revalidated: true, clearedCache: true });
  } catch (err) {
    return res.status(500).json({ message: "Revalidation failed", error: err });
  }
};

export default handler;
