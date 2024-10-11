import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";
import { yColors } from "../theme/colors.tsx";

const Search = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div
      className={
        "mx-6 flex gap-2 px-4 w-full flex-row items-center justify-between border border-bg_secondary rounded-full"
      }
    >
      <BiSearch color={yColors.text.primary} size={24} />
      <input
        type="text"
        placeholder="Buscar por matrícula o nombre..."
        value={query}
        className={"p-2 w-full bg-transparent outline-none"}
        onChange={handleSearch}
      />
      <BsQrCode color={yColors.text.primary} size={24} />
    </div>
  );
};

export default Search;
