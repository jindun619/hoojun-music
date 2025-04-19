import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export function createSpotifySdk() {
  return SpotifyApi.withUserAuthorization(
    process.env.SPOTIFY_CLIENT_ID!,
    "https://localhost:3000"
    // process.env.SPOTIFY_REDIRECT_URI!,
    // ["scope1", "scope2"]
  );
}
