import React, { useState } from "react";
import StartPage from "./components/StartPage";
import QuestionPage from "./components/QuestionPage";
import { nanoid } from "nanoid";

export default function App() {
  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <main>
      {!showQuestions ? (
        <StartPage setShowQuestions={setShowQuestions} />
      ) : (
        <QuestionPage />
      )}
    </main>
  );
}
