import React from "react";
import "./Form.css";

const Form = (props) => {
  return (
    <div class="login-box">
      <h2>New {props.component}</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="required" />
          <label>{props.component} Name</label>
        </div>
        <a href="apps/chat">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
  );
};

export default Form;
