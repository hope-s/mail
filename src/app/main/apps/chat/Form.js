import React from "react";
import "./Form.css";
import CreateChatUseQuery from "../../../../core/services/api/CreateChat.api";

const Form = (props) => {
  const createChatQuery = CreateChatUseQuery();

  const handleSubmitButton = (e) => {
    createChatQuery.mutate({
      name: e.target[0].value,
      type: props.component.charAt(0)
    });
  };

  return (
    <div class="login-box">
      <h2>New {props.component}</h2>
      <form onSubmit={handleSubmitButton}>
        <div class="user-box">
          <input type="text" name="name" required="required" />
          <label>{props.component} Name</label>
        </div>
        <button type="submit">
          <a className="no-underline" href="#">
            Submit
          </a>
        </button>
      </form>
    </div>
  );
};

export default Form;
