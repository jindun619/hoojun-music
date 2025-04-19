import RankingItem from "./RankingItem";

interface SongData {
  id: string;
  ranking: number;
  albumImage: string;
  songName: string;
  overallScore: number;
}

interface RankingListProps {
  songs: SongData[];
}

const RankingList = ({ songs }: RankingListProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Top Ranked Songs
      </h2>
      <div className="space-y-2">
        {songs.map((song) => (
          <RankingItem
            key={song.id}
            id={song.id}
            ranking={song.ranking}
            albumImage={song.albumImage}
            songName={song.songName}
            overallScore={song.overallScore}
          />
        ))}
      </div>
    </div>
  );
};

export default RankingList;
