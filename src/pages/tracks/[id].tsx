import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { getRankedTracks } from "@/utils/getRankedTracks";
import { getTrackInfo } from "@/lib/spotify/getTrackInfo";
import { getArtistInfo } from "@/lib/spotify/getArtistInfo";
import { RankedTrack } from "@/types/RankedTrack";

interface TrackDetailPageProps {
  track: RankedTrack;
  album: {
    name: string;
    image: string;
    release_date: string;
  };
  artist: {
    name: string;
    genres: string[];
    imageUrl: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const rankedTracks = await getRankedTracks();
  const paths = rankedTracks.map((track) => ({
    params: { id: track.id },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<TrackDetailPageProps> = async (
  context
) => {
  const { id } = context.params as { id: string };
  const rankedTracks = await getRankedTracks();
  const track = rankedTracks.find((t) => t.id === id)!;

  const trackInfo = await getTrackInfo(track.trackId);
  if (!trackInfo) {
    return { notFound: true };
  }

  const artistId = trackInfo.artists[0].id;
  const artistInfo = await getArtistInfo(artistId);

  return {
    props: {
      track: { ...track, rank: rankedTracks.findIndex((t) => t.id === id) + 1 },
      album: {
        name: trackInfo.album.name,
        image: trackInfo.album.images[0].url,
        release_date: trackInfo.album.release_date,
      },
      artist: {
        name: artistInfo.name,
        genres: artistInfo.genres,
        imageUrl: artistInfo.images[0]?.url ?? "",
      },
    },
    revalidate: 60,
  };
};

const TrackDetailPage = ({ track, album, artist }: TrackDetailPageProps) => {
  const scoreLabels: Record<string, string> = {
    structure: "구조적 흐름(structure)",
    lyrics: "가사(lyrics)",
    production: "프로덕션(production)",
    performance: "퍼포먼스(performance)",
    originality: "독창성(originality)",
    melody_rhythm: "멜로디 & 리듬(melody & rhythm)",
    emotion: "감정 깊이(emotion)",
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10 text-neutral-900">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <Image
          src={album.image}
          alt="Album Cover"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight leading-snug">
            {track.trackName}
          </h1>
          <p className="text-sm text-primary font-semibold">
            랭크 #{track.rank}
          </p>
          <p className="text-lg font-bold text-neutral-800">{artist.name}</p>
          <div className="flex flex-wrap gap-2">
            {artist.genres.map((genre) => (
              <span
                key={genre}
                className="badge badge-secondary text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-sm font-medium">앨범: {album.name}</p>
          <p className="text-sm text-gray-500">발매일: {album.release_date}</p>
        </div>
      </div>

      {track.description && (
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">설명</h2>
          <p className="text-gray-700 whitespace-pre-wrap text-base">
            {track.description}
          </p>
        </div>
      )}

      <div className="bg-base-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">점수</h2>
        <div className="text-lg font-bold text-primary mb-4">
          종합 점수: {track.overallScore.toFixed(1)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(track.scores).map(([key, value]) => (
            <div
              key={key}
              className="px-4 py-3 bg-neutral-100 rounded-md text-sm text-neutral-700 flex flex-col items-start gap-1"
            >
              <span className="font-medium break-keep leading-snug">
                {scoreLabels[key as keyof typeof scoreLabels] ?? key}
              </span>
              <span className="font-bold text-base">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackDetailPage;
