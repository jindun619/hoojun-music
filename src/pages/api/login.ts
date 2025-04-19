// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createSpotifySdk } from "@/utils/spotify";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
  ]; // 요청할 권한 설정

  // Spotify 인증 URL 생성
  const sdk = createSpotifySdk(redirectUri, scopes);
  const authorizationUrl = sdk.createAuthorizationUrl();

  res.redirect(authorizationUrl); // 로그인 페이지로 리디렉션
}
