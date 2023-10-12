import { useEffect, useRef, useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const [enteredMail, setEnteredMail] = useState("");
  const [enteredMailTouched, setEnteredMailTouched] = useState(false);

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

  //Form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    resetNameInput();

    if (!enteredNameIsValid && !enteredMailIsValid) {
      alert("Boş bırakılamaz");
      return;
    }

    console.log("name: " + enteredName);
    console.log("email: " + enteredMail);

    setEnteredMail("");
    setEnteredMailTouched(false);
  };

  const mailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const nameInputClasses = nameInputHasError
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
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
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
