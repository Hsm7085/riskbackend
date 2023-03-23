import React from "react";
import Value from "./Value";

export default function MyAccodian(props) {

  return (
    <>
      {props.data.map((curEle, i) => {
        return <div className="container" key={i+2*props.currentPage-1}>
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

                return <Value key={score} {...id} select={i+2*props.currentPage-1} set={props.set} handleScore={props.handleScore} obj={props.obj}
                />;
              })}
            </div>
          }
        </div>;
      })}
    </>
  );
}
