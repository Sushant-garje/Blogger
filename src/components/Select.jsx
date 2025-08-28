import React, { useId } from "react";

function Select({ options, label, classname = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label className="" htmlFor={id}></label>}

      <select
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border border-gray-200 w-full ${classname}`}
        id={id}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} id={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
