import { Track } from "@/types/Track";
import Image from "next/image";

interface TrackListProps {
  tracks: Track[];
  handleDelete: (id: string) => void;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, handleDelete }) => {
  return (
    <div className="space-y-6">
      {tracks.map((track) => (
        <div
          key={track.trackId}
          className="flex items-center bg-base-100 shadow-md p-4 rounded-lg hover:shadow-xl transition-all duration-200"
        >
          <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
            <Image
              src={track.albumImgUrl}
              alt="Album cover"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-neutral-900 truncate">
              {track.trackName}
            </h2>
            <p className="text-sm text-neutral-500 truncate">
              {track.artistName}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
              {Object.entries(track.scores).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace("_", " ")}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            {track.description && (
              <p className="text-sm text-gray-600 italic mt-2">
                {track.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end ml-4">
            <div className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-lg">
              {track.overallScore.toFixed(1)}
            </div>
          </div>

          <div className="ml-4">
            <button
              className="btn btn-error btn-sm"
              onClick={() => handleDelete(track.id)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
