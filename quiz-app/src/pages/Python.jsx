import React, { useState, useEffect } from 'react';
import cppQuestions from '../Questions/python.json';
import './c.css';

const Python = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(true);

  // Handle option click
  const handleOptionClick = (questionIndex, selectedOption) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: selectedOption,
      }));
    }
  };

  // Handle submit quiz
  const handleSubmit = () => {
    let calculatedScore = 0;

    cppQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setIsSubmitted(true);
    setTimerRunning(false);  // Stop the timer once the quiz is submitted
  };

  // Timer countdown
  useEffect(() => {
    // Only start the timer once when the component mounts
    if (!timerRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up on component unmount or when timer stops
    return () => clearInterval(timer);
  }, [timeLeft, timerRunning]); // Dependency array to run only when timeLeft or timerRunning changes

  // Stop timer if it reaches 0 or is submitted
  useEffect(() => {
    if (timeLeft === 0 || !timerRunning) {
      handleSubmit();  // Automatically submit quiz when time is up or timer is stopped
    }
  }, [timeLeft, timerRunning]); // Dependency array to track changes in timeLeft or timerRunning

  return (
    <div className={`quiz-container ${isSubmitted ? 'quiz-submitted' : ''}`}>
      <div className='title'>
        <h1 className="quiz-title">Web Development Quiz</h1>
        <div className="timer">
          {
            timeLeft<=10 ? (
              <h3 className='notime'>Time Left: {timeLeft}s</h3>
            ):
          <h3 className='time'>Time Left: {timeLeft}s</h3>
          } 
        </div>
      </div>

      {/* Quiz Questions */}
      {cppQuestions.map((q, index) => (
        <div key={index} className="question-container">
          <h3 className="question">{q.question}</h3>
          <ul className="options-list">
            {q.options.map((option, i) => {
              const isCorrect = option === q.answer;
              const isSelected = selectedAnswers[index] === option;

              return (
                <li
                  key={i}
                  className={`option ${
                    isSelected ? 'selected-option' : ''
                  } ${
                    isSubmitted && isSelected
                      ? isCorrect
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  }`}
                  onClick={() => !isSubmitted && handleOptionClick(index, option)}
                >
                  {option}
                  {isSubmitted && isSelected && isCorrect && (
                    <span className="feedback correct-feedback">✔</span>
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <span className="feedback incorrect-feedback">✘</span>
                  )}
                  {isSubmitted && !isSelected && isCorrect && (
                    <span className="feedback correct-answer">(Correct Answer)</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Submit Button */}
      {!isSubmitted ? (
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      ) : (
        <div className="result">
          <h2>Your Score: {score} / {cppQuestions.length}</h2>
        </div>
      )}
    </div>
  );
};

export default Python;
