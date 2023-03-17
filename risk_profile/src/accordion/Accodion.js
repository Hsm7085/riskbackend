import React, { useState } from "react";
import axios from "axios";
import { RiskData } from "./api";
import MyAccodian from "./MyAccodian";
import { useNavigate } from "react-router-dom";
import "./accodion.css";


export default function Accodion() {

  const [datavalue, setdata] = useState(new Set());
  const [value, setvalue] = useState(false);
  const [selected, setSelected] = useState(true);
  const [obj, setobj] = useState({ });

  const set = (i, val) => {
    if (!datavalue.has(i)) {
      datavalue.add(i);
      setdata(datavalue);
    }
    setobj((prevState) => ({ ...prevState, [i]: val }));

    if (datavalue.size == RiskData.length) {
      setSelected(true);
    }
    // console.log(datavalue);
    console.log(obj);
  };

  const navigate = useNavigate();

  const handleSubmit=async(event)=>{
    event.preventDefault();
    const name=event.target.name.value;
    const email=event.target.email.value;
    const mobile=event.target.mobile.value;
    await axios.post("/api",{name,email,mobile,obj}).then((response)=>{
        console.log("kjn",response.data);
    });
    navigate("/ThankYouPage");
  }

  return (
    <>
      <section className={`sec ${value && "cont"}`}>
        <h4>Please complete the risk profile given below</h4>
        <MyAccodian data={RiskData} set={set} />
        <button
          disabled={!selected}
          onClick={() => setvalue(true)}
          className="proceedbtn"
        >
          Proceed
        </button>
      </section>
      {value && (
        <div className="popup">
          <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input type="text" name="name" id="name" className="inputPopup" required />
            </div>
            <div>
              <label htmlFor="email">Email </label> <br />
              <input type="email" id="email" name="email" className="inputPopup" required />
            </div>
            <div>
              <label htmlFor="Mobile">Mobile</label>
              <br />
              <input type="tel" id="Mobile" name="mobile" className="inputPopup" required />
            </div>
            <button type="submit"> Submit</button> <br />
          </form>
        </div>
      )}
    </>
  );
}
