import React from "react";

interface OptionProps {
  id: string;
  option: string;
  includesCustom: boolean;
  setIncludesCustom: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Option({
  id,
  option,
  includesCustom,
  setIncludesCustom,
}: OptionProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-4">
      <input
        defaultChecked={includesCustom}
        onChange={() => setIncludesCustom((prev) => !prev)}
        type="checkbox"
        id={id}
      ></input>
      <p className="font-bold text-md">Include {option}</p>
    </label>
  );
}
