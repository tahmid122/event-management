import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
interface Props {
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
}
const EventSearch = ({ setQuery, query }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        value={query}
        className="border border-slate-900 p-2 text-whiter rounded outline-none"
        placeholder="Search by event name"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
    </div>
  );
};

export default EventSearch;
