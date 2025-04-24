// pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = req.query.secret;

  // 보안 확인
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  try {
    const path = req.query.path;
    if (!path || typeof path !== "string") {
      return res.status(400).json({ message: "Missing path" });
    }

    // ISR 경로 재생성
    await res.revalidate(path);
    return res.json({ revalidated: true, path });
  } catch (err) {
    return res.status(500).json({ message: "Revalidation error", error: err });
  }
}
