import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const Editor = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentLine, setCurrentLine] = useState("");
  const myTextArea = useRef();

  const handleOnChange = (e) => {
    setCurrentText(e.target.value);
  };

  // const handleKeyDown = (e) => {
  //   if(e.keyCode === 13){

  //   }
  // };

  const boldClicked = (e) => {
    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        `**${currentText.substring(
          myTextArea.current.selectionStart,
          myTextArea.current.selectionEnd
        )}**` +
        currentText.substring(
          myTextArea.current.selectionEnd,
          currentText.length
        )
    );
  };

  const italicClicked = (e) => {
    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        `*${currentText.substring(
          myTextArea.current.selectionStart,
          myTextArea.current.selectionEnd
        )}*` +
        currentText.substring(
          myTextArea.current.selectionEnd,
          currentText.length
        )
    );
  };

  const blockquoteClicked = (e) => {
    const newlineIndex = currentText
      .substring(0, myTextArea.current.selectionStart)
      .lastIndexOf("\n");
    setCurrentText(
      currentText.substring(0, newlineIndex) +
        `\n>` +
        currentText.substring(newlineIndex + 1, currentText.length)
    );
  };

  const h1Clicked = () => {};

  return (
    <div className="Editor">
      <div className="toolbarContainer">
        <button className="bold" onClick={boldClicked}>
          B
        </button>
        <button className="italic" onClick={italicClicked}>
          I
        </button>
        <button className="blockquote" onClick={blockquoteClicked}>
          "
        </button>
        <button className="h1" onClick={h1Clicked}>
          H1
        </button>
      </div>
      <div className="editorContainer">
        <textarea
          className="inputArea"
          value={currentText}
          onChange={handleOnChange}
          // onKeyDown={handleKeyDown}
          ref={myTextArea}
          cols="30"
          rows="10"
        ></textarea>
        <ReactMarkdown className="preview">{currentText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Editor;
