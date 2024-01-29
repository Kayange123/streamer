"use client";

import qs from "query-string";
import { FormEvent, useState } from "react";
import { X, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!searchValue) return null;

    const url = qs.stringify(
      {
        url: "/",
        query: { term: searchValue },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => setSearchValue("");

  return (
    <form
      className="relative w-full lg:w-[400px] flex items-center"
      onSubmit={onSubmit}
    >
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {searchValue && (
        <X className="absolute top-3 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition" onClick={onClear} />
      )}
      <Button
        variant="secondary"
        type="submit"
        size="sm"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default Search;
