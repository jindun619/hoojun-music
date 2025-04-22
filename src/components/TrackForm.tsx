import { Scores } from "@/types/Scores";

interface TrackFormProps {
  trackId: string;
  scores: Scores;
  setTrackId: React.Dispatch<React.SetStateAction<string>>;
  setScores: React.Dispatch<React.SetStateAction<Scores>>;
  handleAddTrack: () => void;
  handleScoreChange: (key: keyof Scores, value: number) => void;
}

const TrackForm: React.FC<TrackFormProps> = ({
  trackId,
  scores,
  setTrackId,
  setScores,
  handleAddTrack,
  handleScoreChange,
}) => {
  console.log(setScores);
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
