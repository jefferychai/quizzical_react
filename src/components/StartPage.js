import React from "react";

export default function StartPage(props) {
  return (
    <div className="startPage--container">
      <h1 className="startPage--title">Quizzical</h1>
      <p className="startPage--description">Let's start the quiz!</p>
      <button
        className="startPage--quiz_btn"
        onClick={() => props.setShowQuestions(true)}
      >
        Start quiz
      </button>
    </div>
  );
}
