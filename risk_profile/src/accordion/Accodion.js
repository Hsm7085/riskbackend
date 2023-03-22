import React, { useState } from "react";
import axios from "axios";
import { RiskData } from "./api";
import MyAccodian from "./MyAccodian";
// import { useNavigate } from "react-router-dom";
import "./accodion.css";
import Gauge from "./Gauge";

export default function Accodion() {
  const [datavalue, setdata] = useState(new Set());
  const [value, setvalue] = useState(false);
  const [selected, setSelected] = useState(true);
  const [obj, setobj] = useState({});
  const [validationMessages, setValidationMessages] = useState([]);
  const [formData, setFormData] = useState({});
  var setnav = false;
  // eslint-disable-next-line
  const [count, setCount] = useState([]);

  const [gaugeShow, setGaugeShow] = useState(false);
  const [scoreVal, setScoreVal] = useState(new Set());
  const [name,setName]=useState();
  const handleScore = (i, value) => {

    count.push(value);
    addingScore();
  };

  const addingScore = () => {
    let sum = 0;
    for (let i = 0; i < count.length; i++) {
      sum += count[i];
    }

    if(sum===0 && sum <=10){
      setScoreVal(sum);
      setName("Conservative")
    }
    else if(sum>=11 && sum <=20){
      setScoreVal(sum);
      setName("Moderate Conservative")
    }
    else if(sum>=21 && sum <=30){
      setScoreVal(sum);
      setName("Moderate")
    }
    else if(sum >=31 && sum <=40){
      setScoreVal(sum);
      setName("Moderate Aggressive")
    }
    else{
      if(sum>50){
        setScoreVal(50);
        setName("Aggressive")
        return;
      }
      setScoreVal(sum);
      setName("Aggressive")
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleClick = (evt) => {
    validateForm();
    if (validationMessages.length < 0) {
      evt.preventDefault();
    }
  };
  const validateForm = () => {
    const { name, contact, email } = formData;

    setValidationMessages([]);
    let messages = [];
    let regmobile = /^[0-9]+$/;
    if (name.length < 3) {
      messages.push("Name is too short");
    } else if (name.length > 30) {
      messages.push("Name is too large");
    } else if (contact.length !== 10 || !regmobile.test(contact)) {
      messages.push("Give Valid Mobile Number");
    } else if (
      email.charAt(email.length - 4) !== "." &&
      email.charAt(email.length - 4) !== "."
    ) {
      messages.push(". is not at correct position");
    } else {
      setnav = true;
    }
    setValidationMessages(messages);
  };

  const set = (i, val, score) => {
    if (!datavalue.has(i)) {
      datavalue.add(i);
      setdata(datavalue);
    }
    setobj((prevState) => ({ ...prevState, [i]: val, score }));

    if (datavalue.size === RiskData.length) {
      setSelected(true);
    }
  };

  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClick();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const mobile = event.target.contact.value;
    await axios
      .post("/api", { obj, name, email, mobile })
      .then((response) => {});
    if (setnav) {
      // navigate("/ThankYouPage");
      gauegeSelected();
    }
  };

  const gauegeSelected = () => {
    setGaugeShow(true);
    setvalue(false);
  };

  const RenewRiskProfile = ()  =>{
    console.log("renew")
    // setGaugeShow(false)
    // setScoreVal(0);
    // setCount([0])
    // setName('')
    window.location.reload();
    // console.log(count,name)
  }

  return (
    <>
      <section className={`sec ${value && "cont"} ${gaugeShow && "cont"}`}>
        <h4>Please complete the risk profile given below</h4>
        <MyAccodian data={RiskData} set={set} handleScore={handleScore} />
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
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                className="inputPopup"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email </label> <br />
              <input
                type="email"
                id="email"
                name="email"
                className="inputPopup"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="Mobile">Mobile</label>
              <br />
              <input
                type="tel"
                id="Mobile"
                name="contact"
                className="inputPopup"
                value={formData.contact || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit"> Submit</button> <br />
          </form>
          <div className="validationSummary">
            {validationMessages.length > 0 && <span>Validation Summary </span>}
            {validationMessages.map((vm) => (
              <li key={vm}>{vm}</li>
            ))}
          </div>
        </div>
      )}

      {gaugeShow && <Gauge value={scoreVal} RenewRiskProfile={RenewRiskProfile} name={name}/>}
    </>
  );
}
