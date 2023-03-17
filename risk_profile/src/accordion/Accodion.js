import React, { useState } from "react";
import axios from "axios";
import { RiskData } from "./api";
import MyAccodian from "./MyAccodian";
import { useNavigate } from "react-router-dom";
import "./accodion.css";

export default function Accodion() {

  const [datavalue, setdata] = useState(new Set());
  const [value, setvalue] = useState(false);
  const [selected, setSelected] = useState(false);
  const [obj, setobj] = useState({});
  const [validationMessages, setValidationMessages] = useState([]);
  const [formData, setFormData] = useState({});
  var setnav = false;

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
    }
    else if (name.length > 30) {
      messages.push("Name is too large");
    } else if (contact.length != 10 || !regmobile.test(contact)) {
      messages.push("Give Valid Mobile Number");
    } else if (
      email.charAt(email.length - 4) != "." &&
      email.charAt(email.length - 4) != "."
    ) {
      messages.push(". is not at correct position");
    }
    else {
      setnav = true;
    }
    setValidationMessages(messages);
  };

  const set = (i, val) => {
    if (!datavalue.has(i)) {
      datavalue.add(i);
      setdata(datavalue);
    }
    setobj((prevState) => ({ ...prevState, [i]: val }));

    if (datavalue.size == RiskData.length) {
      setSelected(true);
    }

  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClick();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const mobile = event.target.contact.value;
    await axios.post("/api", { obj, name, email, mobile }).then((response) => {
    });
    if (setnav) {
      navigate("/ThankYouPage");
    }
  };

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
    </>
  );
}
