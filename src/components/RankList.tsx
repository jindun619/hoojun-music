import { RankedTrack } from "@/types/rankedTrack";
import RankItem from "./RankItem";

interface RankListProps {
  data: RankedTrack[];
}

const RankList = ({ data }: RankListProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Top Ranked tracks
      </h2>
      <div className="space-y-2">
        {data.map((track) => (
          <RankItem
            key={track.trackId}
            trackId={track.trackId}
            rank={track.rank}
            albumImgUrl={track.albumImgUrl}
            trackName={track.trackName}
            artistName={track.artistName}
            overallScore={track.overallScore}
            scores={track.scores}
          />
        ))}
      </div>
    </div>
  );
};

export default RankList;
