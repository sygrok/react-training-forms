import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  //useState
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredMailTouched, setEnteredMailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredMailIsValid =
    enteredMail.trim() !== "" && enteredMail.includes("@");
  const emailInputIsInvalid = !enteredMailIsValid && enteredMailTouched;

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid && enteredMailIsValid) {
      //We can check other inputs
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredMailIsValid]);

  const mailInputChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };

  const mailInputBlurHandler = () => {
    setEnteredMailTouched(true);
  };

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  //Form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredMailTouched(true);
    setEnteredNameTouched(true);

    if (!enteredNameIsValid && !enteredMailIsValid) {
      alert("Boş bırakılamaz");
      return;
    }

    console.log("name: " + enteredName);
    console.log("email: " + enteredMail);

    setEnteredMail("");
    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredMailTouched(false);
  };

  const mailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control  ";

  return (
    <form onSubmit={formSubmissionHandler}>
      {/* name input */}
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      {/* mail input */}
      <div className={mailInputClasses}>
        <label htmlFor="name">Your e-mail</label>
        <input
          type="email"
          id="email"
          onChange={mailInputChangeHandler}
          onBlur={mailInputBlurHandler}
          value={enteredMail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">
            Email must include '@' and can't be empty!{" "}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
