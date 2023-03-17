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
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleClick = (evt) => {
    validateForm();
    if (validationMessages.length < 0) {
      evt.preventDefault();
    }
    console.log({
      Name: formData.name,
      Contact: formData.contact,
      Email: formData.email,
    });
  };
  const validateForm = () => {
    const { name, contact, email } = formData;

    setValidationMessages([]);
    let messages = [];
    if (!name) {
      messages.push("Name is required");
    } else if (!contact) {
      messages.push("Contact is required");
    } else if (
      email.charAt(email.length - 4) != "." &&
      email.charAt(email.length - 4) != "."
    ) {
      messages.push(". is not at correct position");
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
    // console.log(datavalue);
    console.log(obj);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClick();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const mobile = event.target.contact.value;
    await axios.post("/api", { obj, name, email, mobile }).then((response) => {
      console.log(response.data);
    });
     navigate("/ThankYouPage");
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
