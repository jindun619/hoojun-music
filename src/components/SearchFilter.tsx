interface SearchFilterProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchFilter = ({
  searchQuery,
  handleSearchChange,
}: SearchFilterProps) => {
  return (
    <div className="card bg-base-100 shadow-md p-4">
      <div className="flex items-center space-x-2">
        <label className="label">
          <span className="label-text">Search Tracks</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by track name or artist"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
