import React, { useEffect, useState } from "react";
import axios from "axios";
import MyAccodian from "./myAccodian";
import "../Media/scss/main.css";
import Gauge from "./graph";
export default function Accodion() {
  const [value, setvalue] = useState(false);
  const [obj, setobj] = useState({});
  const [validationMessages, setValidationMessages] = useState([]);
  const [formData, setFormData] = useState({});
  const [riskMeter, setRiskMeter] = useState(false);
  const [scoreVal, setScoreVal] = useState(new Set());
  const [name, setName] = useState();
  const [currentPage, setCurrPage] = useState(1);
  const [risk, setRisk] = useState();
  var nav = false;

  useEffect(() => {
    axios
      .get("/riskProfileQuestions",)
      .then((res) => {
        setRisk(res.data.result[0].questions);
      });
  }, []);

  //Getting Updated Values in Forms
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  //Frontend Validation 
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
      nav = true;
    }
    setValidationMessages(messages);
  };
  //Store index and their answers in object
  const set = (i, val, score) => {
    setobj((prevState) => ({ ...prevState, [i]: { val: val, score: score } }));
  };

  //Axios call on submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClick();
    if (nav) {
      const name = event.target.name.value;
      const email = event.target.email.value;
      const mobile = event.target.contact.value;
      await axios
        .post("/insertProfileData", { obj, name, email, mobile })
        .then((res) => { });
      await axios
        .get("/getGraphData", { params: { obj: obj, name: name, email: email, mobile: mobile } })
        .then((res) => {
          if (res.data && res.data.result) {
            setScoreVal(res.data.result.sum)
            setName(res.data.result.riskLabel)
          }
        }
        );
      setRiskMeter(true);
      setvalue(false);
    }
  };

  //reload page
  const RenewRiskProfile = () => {
    setName("");
    window.location.reload();
  };
  const recordPerPage = 2;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = risk && risk.slice(firstIndex, lastIndex);
  const npage = Math.ceil(risk && (Object.keys(risk).length / recordPerPage));
  //Get previous questions
  function getPreviousQues() {
    if (currentPage !== 1) {
      setCurrPage(currentPage - 1);
    }
  }
  //Get next questions
  function getNextQues() {
    if (currentPage !== npage) {
      setCurrPage(currentPage + 1);
    }
  }

  return (
    <>
      <section className={`outerContainer ${(value || riskMeter) && "blurBackground"}`}>
        <h4 className="containerHeading">Please complete the risk profile questionnaire given below</h4>
        <MyAccodian
          data={records}
          set={set}
          currentPage={currentPage}
          obj={obj}
        />
        <button className="btn" disabled={currentPage == 1} onClick={getPreviousQues}>Prev</button>
        <button
          disabled={risk && risk.length != (obj && Object.keys(obj).length)}
          className={currentPage == npage ? 'btn proceedBtnShow' : 'proceedBtnHide'}
          onClick={() => setvalue(true)}
        >
          Proceed
        </button>
        <button className="btn nextBtn" disabled={currentPage == npage} onClick={getNextQues}>Next</button>
      </section>
      {value && (
        <div className="popupForm">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                className="inputPopupForm"
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
                className="inputPopupForm"
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
                className="inputPopupForm"
                value={formData.contact || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button className="formSubmitBtn" type="submit"> Submit</button> <br />
          </form>
          <div className="validationSummary">
            {validationMessages.length > 0 && <span>Validation Summary </span>}
            {validationMessages.map((vm) => (
              <li key={vm}>{vm}</li>
            ))}
          </div>
        </div>
      )} {
        riskMeter && (
          <Gauge
            value={scoreVal}
            RenewRiskProfile={RenewRiskProfile}
            name={name}
          />
        )}
    </>
  );
}
