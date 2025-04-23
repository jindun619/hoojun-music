import { Track } from "@/types/Track";

interface TrackListProps {
  tracks: Track[];
  handleDelete: (id: string) => void;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, handleDelete }) => {
  return (
    <div className="space-y-4">
      {tracks.map((track) => (
        <div
          key={track.trackId}
          className="card card-side bg-base-100 shadow-md"
        >
          <figure>
            <img
              src={track.albumImgUrl}
              alt="Album cover"
              className="w-24 h-24 object-cover"
            />
          </figure>
          <div className="card-body w-full">
            <h2 className="card-title">{track.trackName}</h2>
            <p className="text-sm text-gray-500">{track.artistName}</p>
            <p className="text-sm font-semibold">
              Overall Score: {track.overallScore.toFixed(1)}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
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

            <div className="card-actions justify-end mt-2">
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleDelete(track.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
