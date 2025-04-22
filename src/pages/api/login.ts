import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;

  // 비밀번호가 맞는지 확인
  if (password === process.env.ADMIN_PASSWORD) {
    // 비밀번호가 맞으면 JWT 발급
    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      expiresIn: "1h", // 1시간 동안 유효
    });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Invalid password" });
  }
}
