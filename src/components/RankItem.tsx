import { useRouter } from "next/router";
import Image from "next/image";
import { Scores } from "@/types/Scores";

interface RankItemProps {
  id: string;
  rank: number;
  trackName: string;
  artistName: string;
  albumImgUrl: string;
  overallScore: number;
  scores: Scores;
}

const RankItem = ({
  id,
  rank,
  trackName,
  artistName,
  albumImgUrl,
  overallScore,
}: RankItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tracks/${id}`);
  };

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-base-100 cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={handleClick}
    >
      <div className="text-lg font-extrabold text-green-600 w-8 text-center">
        {rank}
      </div>

      <div className="w-16 h-16 relative rounded-lg overflow-hidden">
        <Image
          src={albumImgUrl}
          alt={trackName}
          fill
          sizes="64px"
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-base font-semibold truncate text-neutral-900">
          {trackName}
        </div>
        <div className="text-sm text-neutral-500 truncate">{artistName}</div>
      </div>

      <div className="text-sm font-bold bg-neutral-100 text-neutral-700 px-3 py-1 rounded-md">
        {overallScore.toFixed(1)}
      </div>
    </div>
  );
};

export default RankItem;
