import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MCQExam = () => {
  const [examTimer, setExamTimer] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const getQuestions = async () => {
    try {
      const { data } = await axios.get("/api/question/get-all");

      if (data?.success && Array.isArray(data.question)) {
        setQuestionData(data.question);
      } else {
        console.error("Expected an array but got:", data.question);
        toast.error("Invalid question data received from API");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch questions.");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const formattedQuestions = questionData.map((item) => {
    const options = [item.option1, item.option2, item.option3, item.option4];
    const correctAnswer = item[item.correctoption]; // Get correct option dynamically

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
    e.preventDefault(); // Prevent page reload on form submission
    let calculatedScore = 0;
    formattedQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
// return false
    const resultData = {
        studentid:"679670ac0dce123f24a4bda8",
        questionid:["67a4a31db6aae1e2d5345358","67a4a322b6aae1e2d5345363","67a74f4bb351f3f387dc7f22","67a7517db351f3f387dc7f59"],
        selectedoption:["option2","option2","option4","option1"],
        totaltime:examTimer,
        totalquestion:formattedQuestions.length,
        totalattempt:0,
        correctanswer:score,
        totalmarks:calculatedScore,
    }
    console.log(answers);
    return false;
    
    // Save to database
    try {
    const {data} = await axios.post("/api/exam/add", resultData);
      if(data?.success){
          toast.success(data.message);
      }
    } catch (error) {
      toast.error("Error saving results: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="exam-container p-4 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">MCQ Exam</h2>
          {formattedQuestions.length > 0 ? (
            formattedQuestions.map((q, index) => (
              <div key={index} className="question-block mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {index + 1}. {q.question}
                </h3>
                <div className="options grid grid-cols-2 gap-4">
                  {q.options.map((option, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`option-btn p-2 rounded-xl shadow-md transition-all
                    ${
                      submitted
                        ? option === q.correct
                          ? "bg-green-200 text-green-800"
                          : option === answers[index]
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-100"
                        : answers[index] === option
                        ? "bg-blue-200 text-blue-800"
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

          {!submitted ? (
            <button
              type="submit"
              className="submit-btn mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 disabled:bg-gray-400"
              disabled={Object.keys(answers).length < formattedQuestions.length}
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
    </form>
  );
};

export default MCQExam;


