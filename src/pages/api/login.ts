import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Invalid password" });
  }
};

export default handler;
