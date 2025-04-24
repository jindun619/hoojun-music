import { createSpotifySdk } from ".";

export const getAlbumInfo = async (albumId: string) => {
  const spotify = createSpotifySdk();
  const album = await spotify.albums.get(albumId);
  return album;
};
