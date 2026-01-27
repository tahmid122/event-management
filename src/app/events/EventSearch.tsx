import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
interface Props {
  setQuery: Dispatch<SetStateAction<string>>;
}
const EventSearch = ({ setQuery }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
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
