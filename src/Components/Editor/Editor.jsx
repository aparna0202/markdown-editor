import React, { useRef, useState } from "react";
import "./Editor.css";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import LinkInput from "../LinkInput/LinkInput";
import {
  FaListUl,
  FaListOl,
  FaCode,
  FaRegFileCode,
  FaLink,
  FaRegImage,
  FaUndo,
  FaRedo,
  FaFileDownload,
} from "react-icons/fa";

const Editor = () => {
  const [currentText, setCurrentText] = useState(``);
  const [show, setShow] = useState(false);
  const [showImgPopUp, setShowImgPopUp] = useState(false);
  const [url, setUrl] = useState("https://");
  const [name, setName] = useState("");

  const myTextArea = useRef();

  const handleOnChange = (e) => {
    setCurrentText(`${e.target.value}`);
  };

  const handleClose = () => {
    setShow(false);
    setShowImgPopUp(false);
    setUrl("https://");
    setName("");
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

  const inlineCodeClicked = () => {
    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        "`" +
        currentText.substring(
          myTextArea.current.selectionStart,
          myTextArea.current.selectionEnd
        ) +
        "`" +
        currentText.substring(
          myTextArea.current.selectionEnd,
          currentText.length
        )
    );
  };

  const codeBlockClicked = () => {
    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        "```\n" +
        currentText.substring(
          myTextArea.current.selectionStart,
          myTextArea.current.selectionEnd
        ) +
        "\n```" +
        currentText.substring(
          myTextArea.current.selectionEnd,
          currentText.length
        )
    );
  };

  const linkClicked = () => {
    setShow(true);
  };

  const handleSubmit = () => {
    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        `[${name}](${url})` +
        currentText.substring(
          myTextArea.current.selectionStart,
          currentText.length
        )
    );
  };

  const imageClicked = () => {
    setShowImgPopUp(true);
  };

  const handleSubmitImg = () => {
    setCurrentText(
      currentText.substring(0, myTextArea.current.selectionStart) +
        `[![${name}](${url})](${url})` +
        currentText.substring(
          myTextArea.current.selectionStart,
          currentText.length
        )
    );
  };

  const undoClicked = () => {};
  const redoClicked = () => {};

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
          --
        </button>
        <button className="inlineCode" onClick={inlineCodeClicked}>
          <FaCode />
        </button>
        <button className="codeBlock" onClick={codeBlockClicked}>
          <FaRegFileCode />
        </button>
        <button className="link" onClick={linkClicked}>
          <FaLink />
        </button>
        <LinkInput show={show}>
          <div className="heading">
            <h4>Link</h4>
            <button className="close" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="dataContainer">
            <div className="link">
              <label htmlFor="url">URL:</label>
              <input
                type="url"
                className="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="name">
              <label htmlFor="name">Title:</label>
              <input
                type="text"
                className="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </LinkInput>
        <button className="image" onClick={imageClicked}>
          <FaRegImage />
        </button>

        <LinkInput show={showImgPopUp}>
          <div className="heading">
            <h4>Image</h4>
            <button className="close" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="dataContainer">
            <div className="link">
              <label htmlFor="url">URL:</label>
              <input
                type="url"
                className="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="name">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <button className="submitImg" onClick={handleSubmitImg}>
            Submit
          </button>
        </LinkInput>

        <button className="undo" onClick={undoClicked}>
          <FaUndo />
        </button>
        <button className="redo" onClick={redoClicked}>
          <FaRedo />
        </button>

        <button className="download">
          <FaFileDownload />
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
          spellCheck="false"
        ></textarea>

        <ReactMarkdown remarkPlugins={[breaks]} className="preview">
          {currentText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Editor;
