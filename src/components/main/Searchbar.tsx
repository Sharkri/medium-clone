import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <form
      className="flex items-center bg-gray-50 rounded-full shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();

        if (!search) return;

        navigate(`/search?q=${search}`);
      }}
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass text-gray-400 mr-3 pl-4" />
      </button>

      <input
        type="text"
        placeholder="Search Medium"
        className="pr-4 py-2 bg-transparent focus:outline-none text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
