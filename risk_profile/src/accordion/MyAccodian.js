import React from "react";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Value from "./Value";

export default function MyAccodian({ data, set,handleScore }) {

  return (
    <>
      {data.map((curEle, i) => {
        return <div className="container" key={i}>
          <div>
            <span className="design" >
              {curEle.serialNo}
              {". "}
              {curEle.question}{" "}
            </span>

          </div>

          {
            <div>
              {curEle.choices.map((id) => {
                const { score } = id;

                return <Value key={score} {...id} select={i} set={set} handleScore={handleScore}
                />;
              })}
            </div>
          }
        </div>;
      })}
    </>
  );
}
