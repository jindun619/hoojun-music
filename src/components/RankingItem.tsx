interface RankingItemProps {
  id: string;
  ranking: number;
  albumImage: string;
  songName: string;
  overallScore: number;
}

const RankingItem = ({
  ranking,
  albumImage,
  songName,
  overallScore,
}: RankingItemProps) => {
  return (
    <div className="card bg-base-100 shadow-md my-2">
      <div className="card-body p-4 flex flex-row items-center space-x-4">
        <div className="text-2xl font-bold text-primary w-8 text-center">
          {ranking}
        </div>
        <div className="w-14 h-14 rounded overflow-hidden">
          <img
            src={albumImage}
            alt={songName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 text-lg font-medium truncate">{songName}</div>
        <div className="badge badge-secondary text-base py-3 px-4 font-semibold">
          {overallScore.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default RankingItem;
