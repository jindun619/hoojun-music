import { RankedTrack } from "@/types/rankedTrack";

const RankItem = ({
  rank,
  trackId,
  trackName,
  artistName,
  albumImgUrl,
  overallScore,
}: RankedTrack) => {
  console.log(trackId);
  return (
    <div className="card bg-base-100 shadow-md my-2">
      <div className="card-body p-4 flex flex-row items-center space-x-4">
        <div className="text-2xl font-bold text-primary w-8 text-center">
          {rank}
        </div>

        <div className="w-14 h-14 rounded overflow-hidden">
          <img
            src={albumImgUrl}
            alt={trackName}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1">
          <div className="text-lg font-medium truncate">{trackName}</div>
          <div className="text-sm text-gray-500 truncate">{artistName}</div>
        </div>

        <div className="badge badge-secondary text-base py-3 px-4 font-semibold">
          {overallScore.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default RankItem;
