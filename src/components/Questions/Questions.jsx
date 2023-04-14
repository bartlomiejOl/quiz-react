import React, { useState, useEffect } from 'react'
import './Questions.css'
import questionsData from '../../questions.json';
import { shuffle } from 'lodash';

function Questions(props) {

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [lastQuestion, setLastQuestion] = useState(false);

  useEffect(() => {
    questionsData.categories.map((category) => {
      if(category.name === props.category){
        const shuffledQuestions = category.questions.map(question => ({
          ...question,
          answers: shuffle(question.answers)
        }));
        setQuestions(shuffledQuestions)
      }
    })
  }, [props.category]);

  useEffect(() => {
    if (timeLeft === 0 && !lastQuestion) {
      handleNextQuestion();
    } else if (timeLeft === 0 && lastQuestion) {
      setTimeLeft(0);
    }
  }, [timeLeft, lastQuestion]);
  
  useEffect(() => {
    if (currentIndex < questions.length) {
      setTimeLeft(5);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1 && currentIndex === questions.length - 1) {
            clearInterval(timer);
            setLastQuestion(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, questions]);

  const handleNextQuestion = () => {
    if (currentIndex === questions.length - 2) {
      setLastQuestion(true);
    } else if (currentIndex === questions.length - 1) {
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setSelectedAnswerIndex(-1);
  };

  const handleCompleteQuiz = () => {
    setCompleted(true);
  };

  const handleAnswerClick = (index, isCorrect) => {
    if (selectedAnswerIndex === -1) {
      setSelectedAnswerIndex(index);
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleReset = () =>{
    window.location.reload()
  }


  return (
    <div className='Questions'>
      {questions[currentIndex] && (
        <div className='question'>
          <h2>{questions[currentIndex].question}</h2>
          <h3>Pozostały czas na odpowiedź: {timeLeft}</h3>
          <ul className='answerList'>
            {questions[currentIndex].answers.map((answer, index) => (
              <button
              className={selectedAnswerIndex === index ? (answer.isCorrect ? 'correct' : 'incorrect') : 'answer'}
              key={index}
              onClick={() => handleAnswerClick(index, answer.isCorrect)}
              disabled={timeLeft === 0}
            >
              {answer.answer}
            </button>
            ))}
          </ul>
        </div>
      )}
       {currentIndex === questions.length - 1 ? (
          <div className='endButtons'>
            <button onClick={handleCompleteQuiz} className='button' disabled={completed === true}>
              Zakończ
            </button>
            <button className='button' disabled={completed === false} onClick={handleReset}>
              Restartuj
            </button>
          </div>
        ) : (
          <button onClick={handleNextQuestion} disabled={currentIndex === questions.length - 1} className='button'>
            Następne pytanie
          </button>
        )}
      {completed && (
        <div className='result'>
          <h3>Twój wynik: {score} / {questions.length}</h3>
        </div>
      )}
    </div>
  );
}

export default Questions