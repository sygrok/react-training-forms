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

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      //We can check other inputs
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  //Form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    resetNameInput();
    resetEmailInput();

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      alert("Boş bırakılamaz");
      return;
    }

    console.log("name: " + enteredName);
    console.log("email: " + enteredEmail);
  };

  const emailInputClasses = emailInputHasError
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
      <div className={emailInputClasses}>
        <label htmlFor="name">Your e-mail</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
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
