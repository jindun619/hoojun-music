type SortOption = "trackName" | "artistName" | "overallScore";
type SortOrder = "asc" | "desc";

interface SortFilterProps {
  sortOption: SortOption;
  sortOrder: SortOrder;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}

const SortFilter: React.FC<SortFilterProps> = ({
  sortOption,
  sortOrder,
  setSortOption,
  setSortOrder,
}) => {
  return (
    <div className="card bg-base-100 shadow-md p-4">
      <div className="flex items-center space-x-4">
        <label className="label">
          <span className="label-text">Sort By</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
        >
          <option value="trackName">Track Name</option>
          <option value="artistName">Artist Name</option>
          <option value="overallScore">Overall Score</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
