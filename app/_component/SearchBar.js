"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getPOI } from "@/app/_lib/AMapPOI";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchParams = useSearchParams();
  const [isFocus, setIsFocus] = useState(false);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (inputValue) {
        const data = await getPOI(inputValue);
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  function handleSearch(input) {
    const [lat, lng] = input.split(",");
    const params = new URLSearchParams(searchParams);
    if (input) {
      params.set("lat", lat);
      params.set("lng", lng);
    } else {
      params.delete("lat");
      params.delete("lng");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleFocus(state) {
    setIsFocus(state);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0 z-10">
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"输入地点"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(e.target.value);
          }
        }}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
      />
      {suggestions.length > 0 && isFocus && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setInputValue(suggestion.name);
                handleSearch(suggestion.location);
              }}
            >
              <div>{suggestion.name}</div>
              <div>{suggestion.address}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
