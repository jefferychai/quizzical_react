import React, { useState, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";
import Confetti from "react-confetti";

export default function QuestionPage(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (quizzes.length === 0) {
      fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
      )
        .then((res) => res.json())
        .then((data) => {
          setQuizzes(data.results);
          setQuestionsAndAnswers(
            data.results.map((questionObject) => {
              return {
                question: questionObject.question,
                shuffledAnswers: shuffle([
                  ...questionObject.incorrect_answers,
                  questionObject.correct_answer,
                ]),
                selectedAnswer: "",
                correctAnswer: questionObject.correct_answer,
              };
            })
          );
        });
    }
  }, [quizzes]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const questionsElement = questionsAndAnswers.map((questionObject, index) => {
    return (
      <SingleQuestion
        key={index}
        question={questionObject.question}
        allAnswers={questionObject.shuffledAnswers}
        selectedAnswer={questionObject.selectedAnswer}
        correctAnswer={questionObject.correctAnswer}
        updateSelectedAnswer={updateSelectedAnswer}
        showResult={showResult}
      />
    );
  });

  function updateSelectedAnswer(currentQuestion, answer) {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject) => {
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      })
    );
  }

  function checkAnswers() {
    const notAllAnswered = questionsAndAnswers.some(
      (questionObject) => questionObject.selectedAnswer === ""
    );
    setShowWarning(notAllAnswered);

    // Checking every questions's correct answer.
    if (!notAllAnswered) {
      questionsAndAnswers.forEach((questionObject) => {
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          setScore((prevScore) => prevScore + 1);
        }
      });
      setShowResult((prevShowResult) => !prevShowResult);
    }
  }

  function playAgain() {
    setQuizzes([]);
    setQuestionsAndAnswers([]);
    setScore(0);
    setShowResult(false);
  }

  return (
    <div>
      <div className="question-container">{questionsElement}</div>
      <div className="text-center">
        {showWarning && (
          <p className="warning-text">There are questions not answered yet!</p>
        )}
        {quizzes.length > 0 && !showResult ? (
          <button className="checkAnswer-btn" onClick={checkAnswers}>
            Check answer
          </button>
        ) : null}
      </div>

      {showResult && (
        <div className="result-container">
          <p className="result-text">
            You scored {score}/{questionsAndAnswers.length} correct answers
          </p>
          <button className="checkAnswer-btn" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}

      {showResult && <Confetti />}
    </div>
  );
}
