import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1]; // Authorization 헤더에서 JWT 추출

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // JWT 검증
    jwt.verify(token, process.env.JWT_SECRET as string);
    return res.status(200).json({ message: "Protected content" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
