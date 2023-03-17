import React from "react";

export default function Value({ score, option, select, set }) {

  return (
    <div className="input">
      <label htmlFor={`opt${score}${select}`}>
        <input
          type="radio"
          id={`opt${score}${select}`}
          value={option}
          name={select}

          onClick={(e) => set(select, e.target.value)}

          required
        />
        {option} <br />
      </label>
    </div>
  );
}
