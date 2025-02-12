import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MCQExam = () => {
  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showModal, setShowModal] = useState(false); // Modal state

  const getQuestions = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_BASE_URL}/api/question/get-all`);
      if (data?.success && Array.isArray(data.question)) {
        setQuestionData(data.question);
      } else {
        toast.error("Invalid question data received from API");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch questions.");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    let timer;
    if (!submitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setSubmitted(true);
      setShowModal(true); // Show modal when time runs out
    }
    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  const formattedQuestions = questionData.map((item) => {
    const options = [item.option1, item.option2, item.option3, item.option4];
    const correctAnswer = item[item.correctoption];

    return {
      question: item.questiontext,
      options: options,
      correct: correctAnswer,
    };
  });

  const handleSelect = (questionIndex, option) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let calculatedScore = 0;
    formattedQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
    setShowModal(true); // Show modal after submission

    const resultData = {
      totaltime: 600,
      totalquestion: formattedQuestions.length,
      totalattempt: Object.keys(answers).length,
      correctanswer: calculatedScore,
      totalmarks: calculatedScore,
    };

    try {
      const { data } = await axios.post(`${BACKEND_BASE_URL}/api/exam/add`, resultData);
      if (data?.success) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Error saving results: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      

      {/* Popup Modal */}
      {showModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center py-5">
            <h2 className="text-2xl font-bold">🎉 Thank You! 🎉</h2>
            <p className="mt-2">Your exam has been submitted successfully.</p>
            <p className="text-lg font-bold mt-2">Your Score: {score}/{formattedQuestions.length}</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard");
              }}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 btn-voilate"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      ):(
        <div className="row">
        <div className="exam-container p-4 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">MCQ Exam</h2>
          <div className="timer text-lg font-semibold mb-4">Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
          <div className="questions-div">
            {formattedQuestions.length > 0 ? (
              formattedQuestions.map((q, index) => (
                <div key={index} className="question-block mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {index + 1}. {q.question}
                  </h3>
                  <div className="options grid grid-cols-2 gap-4">
                    {q.options.map((option, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`option-btn p-2 rounded-xl shadow-md transition-all
                          ${
                            submitted
                              ? option === q.correct
                                ? "bg-green-200 text-green-800"
                                : answers[index] === option
                                ? "bg-red-200 text-red-800"
                                : "bg-gray-100"
                              : answers[index] === option
                              ? "bg-blue-300 bg-light-voilate"
                              : "bg-gray-100"
                          }
                        `}
                        onClick={() => handleSelect(index, option)}
                        disabled={submitted}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>Loading questions...</p>
            )}
          </div>

          {!submitted ? (
            <button
              className="submit-btn mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600"
              type="submit"
            >
              Submit Exam
            </button>
          ) : (
            <h3 className="text-xl font-bold mt-4">
              Your Score: {score}/{formattedQuestions.length}
            </h3>
          )}
        </div>
      </div>
      )}
    </form>
  );
};

export default MCQExam;
