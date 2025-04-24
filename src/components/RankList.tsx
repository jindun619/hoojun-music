import { RankedTrack } from "@/types/RankedTrack";
import RankItem from "./RankItem";

interface RankListProps {
  data: RankedTrack[];
}

const RankList = ({ data }: RankListProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      {/* <h2 className="text-3xl font-extrabold text-center text-primary mb-2 tracking-tight">
        🎶 Hoojun’s Music Chart
      </h2> */}
      {/* <p className="text-center text-sm text-base-content/70 mb-6">
        기깔난 subtitle이 떠오르지 않네.. 일단 보류!
      </p> */}
      <div className="space-y-2">
        {data.map((track) => (
          <RankItem
            key={track.id}
            id={track.id}
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
