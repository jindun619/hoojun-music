import { Scores } from "@/types/Scores";

interface TrackFormProps {
  trackId: string;
  description: string;
  scores: Scores;
  setTrackId: React.Dispatch<React.SetStateAction<string>>;
  setDescription: (desc: string) => void;
  handleAddTrack: () => void;
  handleScoreChange: (key: keyof Scores, value: number) => void;
}

const TrackForm = ({
  trackId,
  description,
  scores,
  setTrackId,
  setDescription,
  handleAddTrack,
  handleScoreChange,
}: TrackFormProps) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Track ID or URL (from Spotify)</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            placeholder="e.g. https://open.spotify.com/track/2kkvB3RNRzwjFdGhaUA0tz"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="설명 (선택)"
            className="input input-bordered w-full"
          />
        </div>
        {Object.entries(scores).map(([key, value]) => (
          <div key={key}>
            <label className="label">
              <span className="label-text capitalize">
                {key.replace("_", "/")}
              </span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={value}
              onChange={(e) =>
                handleScoreChange(key as keyof Scores, Number(e.target.value))
              }
            />
          </div>
        ))}

        <button className="btn btn-primary w-full" onClick={handleAddTrack}>
          Add Track
        </button>
      </div>
    </div>
  );
};

export default TrackForm;
