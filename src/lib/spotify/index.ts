import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const createSpotifySdk = () => {
  return SpotifyApi.withClientCredentials(
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!
  );
};
