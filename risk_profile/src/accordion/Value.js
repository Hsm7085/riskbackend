import React from "react";

export default function Value(props) {
  
  return (
    
      <div className="input table">
      <label htmlFor={`opt${props.score}${props.select}`}>
        <input
          type="radio"
          id={`opt${props.score}${props.select}`}
          value={props.option}
          name={props.select}

          onChange={(e) => {props.set(props.select, e.target.value); props.handleScore(props.select,props.score) }} 

          required
          checked={props.obj[props.select]===props.option}
        />
        {props.option} 
      </label>
      </div>
    
  );
}
