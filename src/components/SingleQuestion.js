import React from "react";
import { decode } from "html-entities";

export default function SingleQuestion(props) {
  function clickedAnswer(answer, currentQuestion) {
    props.updateSelectedAnswer(currentQuestion, answer);
    console.log(currentQuestion, answer);
  }

  const answersElement = props.allAnswers.map((answer, index) => {
    return (
      <button
        className={`answer-box ${
          props.selectedAnswer === answer ? "selected" : ""
        } ${
          props.showResult && answer === props.correctAnswer ? "correct" : ""
        } ${
          props.showResult &&
          answer === props.selectedAnswer &&
          answer !== props.correctAnswer
            ? "incorrect"
            : ""
        } ${
          props.showResult && answer !== props.correctAnswer ? "dimmed" : ""
        }`}
        key={index}
        onClick={() => clickedAnswer(answer, props.question)}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="question--container">
      <h3 className="question">{decode(props.question)}</h3>
      <div className="answers--container">{answersElement}</div>
    </div>
  );
}
