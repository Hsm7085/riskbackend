import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Value from "./Value";

export default function MyAccodian({ data, set }) {
  const [select, setSelected] = useState(null);

  const toggle = (i) => {
    if (select === i) {
      return setSelected(null)
    }

    setSelected(i)
  }

  return (
    <>
      {data.map((curEle, i) => {
        return <div className="container" key={i}>
          <div onClick={() => toggle(i)}>
            <span className="design" >
              {curEle.serialNo}
              {". "}
              {curEle.question}{" "}
            </span>
            <span className="arrow" >
              {select === i ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </span>

          </div>

          {
            <div className={select === i ? 'content show' : 'content hide'}>
              {curEle.choices.map((id) => {
                const { score } = id;

                return <Value key={score} {...id} select={i} set={set}
                />;
              })}

              {/* <DataSave curEle={curEle}  select={select} nextToggle={nextToggle} arr={arr}/> */}


            </div>
          }
        </div>;
      })}
    </>
  );
}
