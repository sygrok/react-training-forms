import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  //Name Hook
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  //Last Name Hook
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  //Email Hook
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.includes("@"));

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (nameIsValid && lastNameIsValid && emailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameIsValid, lastNameIsValid, emailIsValid]);

  //Submit Handler
  const submitHandler = (event) => {
    if (!formIsValid) {
      //added if statement just in case if the user play with dev-tools
      return alert("don't play with dev tools!");
    }

    event.preventDefault();
    lastNameReset();
    nameReset();
    emailReset();

    console.log("First name: " + nameValue);
    console.log("Last name: " + lastNameValue);
    console.log("Email: " + emailValue);
  };

  const nameClass = nameHasError ? "form-control invalid" : "form-control ";
  const lastNameClass = lastNameHasError
    ? "form-control invalid"
    : "form-control ";

  const emailClass = emailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={nameClass}>
          <label htmlFor="name">First Name</label>
          <input
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            type="text"
            id="name"
          />
          {nameHasError && (
            <p className="error-text">Name field can't be emty!</p>
          )}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="name">Last Name</label>
          <input
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            type="text"
            id="name"
          />
          {lastNameHasError && (
            <p className="error-text">Last name field can't be empty!</p>
          )}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="email"
          id="email"
        />
        {emailHasError && (
          <p className="error-text">
            Email field can't be empty and must include '@' character!
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

export default BasicForm;
