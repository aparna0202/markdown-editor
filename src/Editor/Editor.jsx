import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import { FaListUl, FaListOl } from "react-icons/fa";

const Editor = () => {
  const [currentText, setCurrentText] = useState(``);
  const [selectedText, setSelectedText] = useState("");
  const myTextArea = useRef();

  const handleOnChange = (e) => {
    setCurrentText(`${e.target.value}`);
    setSelectedText(
      currentText.substring(
        myTextArea.current.selectionStart,
        myTextArea.current.selectionEnd
      )
    );
  };

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
      currentText.substring(0, newlineIndex + 1) +
        `>` +
        currentText.substring(newlineIndex + 1, currentText.length)
    );
  };

  const h1Clicked = () => {
    const newlineIndex = currentText
      .substring(0, myTextArea.current.selectionStart)
      .lastIndexOf("\n");
    setCurrentText(
      currentText.substring(0, newlineIndex + 1) +
        `# ` +
        currentText.substring(newlineIndex + 1, currentText.length)
    );
  };

  const h2Clicked = () => {
    const newlineIndex = currentText
      .substring(0, myTextArea.current.selectionStart)
      .lastIndexOf("\n");
    setCurrentText(
      currentText.substring(0, newlineIndex + 1) +
        `## ` +
        currentText.substring(newlineIndex + 1, currentText.length)
    );
  };

  const h3Clicked = () => {
    const newlineIndex = currentText
      .substring(0, myTextArea.current.selectionStart)
      .lastIndexOf("\n");
    setCurrentText(
      currentText.substring(0, newlineIndex + 1) +
        `### ` +
        currentText.substring(newlineIndex + 1, currentText.length)
    );
  };

  const h4Clicked = () => {
    const newlineIndex = currentText
      .substring(0, myTextArea.current.selectionStart)
      .lastIndexOf("\n");
    setCurrentText(
      currentText.substring(0, newlineIndex + 1) +
        `#### ` +
        currentText.substring(newlineIndex + 1, currentText.length)
    );
  };

  const unOrderedListClicked = () => {
    const stringArray = currentText
      .substring(
        myTextArea.current.selectionStart,
        myTextArea.current.selectionEnd
      )
      .split(/\r?\n/);

    const newArray = stringArray.map((item) => `- ` + item).join("\r\n");

    // const finalArray = newArray.join("\r\n");

    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        newArray +
        currentText.substring(
          myTextArea.current.selectionEnd,
          currentText.length
        )
    );
  };
  const orderedListClicked = () => {
    const stringArray = currentText
      .substring(
        myTextArea.current.selectionStart,
        myTextArea.current.selectionEnd
      )
      .split(/\r?\n/);

    const newArray = stringArray
      .map((item) => stringArray.indexOf(item) + 1 + `. ` + item)
      .join("\r\n");

    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        newArray +
        currentText.substring(
          myTextArea.current.selectionEnd,
          currentText.length
        )
    );
  };

  const horizontalRuleClicked = () => {
    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        `\n\n` +
        `------------` +
        `\n`
    );
  };

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
        <button className="h2" onClick={h2Clicked}>
          H2
        </button>
        <button className="h3" onClick={h3Clicked}>
          H3
        </button>
        <button className="h4" onClick={h4Clicked}>
          H4
        </button>
        <button className="unOrderedList" onClick={unOrderedListClicked}>
          <FaListUl />
        </button>
        <button className="orderedList" onClick={orderedListClicked}>
          <FaListOl />
        </button>
        <button className="horizontalRule" onClick={horizontalRuleClicked}>
          -
        </button>
      </div>
      <div className="editorContainer">
        <textarea
          className="inputArea"
          value={currentText}
          onChange={handleOnChange}
          ref={myTextArea}
          cols="30"
          rows="10"
        ></textarea>
        <ReactMarkdown remarkPlugins={[breaks]} className="preview">
          {currentText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Editor;
