import React from "react";
import "./LinkInput.css";

const LinkInput = (props) => {
  return props.show ? <div className="LinkInput">{props.children}</div> : "";
};

export default LinkInput;
