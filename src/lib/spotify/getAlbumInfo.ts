import { createSpotifySdk } from ".";

export async function getAlbumInfo(albumId: string) {
  const spotify = createSpotifySdk();
  const album = await spotify.albums.get(albumId);
  return album;
}
