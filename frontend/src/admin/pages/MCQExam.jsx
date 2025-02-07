import React, { useState } from "react";
import axios from "axios";
// import "./MCQExam.css";

const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"], correct: "Shakespeare" },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "500 km/s"], correct: "300,000 km/s" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correct: "Mars" },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"], correct: "Leonardo da Vinci" },
    { question: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Carbon Dioxide" },
    { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Silver"], correct: "Diamond" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Pacific" },
    { question: "Which country invented pizza?", options: ["France", "Italy", "USA", "Spain"], correct: "Italy" },
];

const MCQExam = () => {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleSelect = (questionIndex, option) => {
        setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    };

    const handleSubmit = async () => {
        let calculatedScore = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct) {
                calculatedScore += 1;
            }
        });
        setScore(calculatedScore);
        setSubmitted(true);

        // Save to database
        try {
            await axios.post("http://localhost:5000/api/save-results", {
                user: "John Doe",  // Replace with dynamic user data
                answers: Object.values(answers),
                score: calculatedScore,
            });
            alert("Results saved successfully!");
        } catch (error) {
            console.error("Error saving results:", error);
        }
    };

    return (
        <div className="exam-container">
            <h2>MCQ Exam</h2>
            {questions.map((q, index) => (
                <div key={index} className="question-block">
                    <h3>{index + 1}. {q.question}</h3>
                    <div className="options">
                        {q.options.map((option, i) => (
                            <button
                                key={i}
                                className={`option-btn ${
                                    submitted 
                                        ? option === q.correct 
                                            ? "correct" 
                                            : option === answers[index] 
                                                ? "incorrect" 
                                                : ""
                                        : answers[index] === option 
                                            ? "selected" 
                                            : ""
                                }`}
                                onClick={() => handleSelect(index, option)}
                                disabled={submitted}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            {!submitted ? (
                <button className="submit-btn" onClick={handleSubmit} disabled={Object.keys(answers).length < 10}>
                    Submit Exam
                </button>
            ) : (
                <h3>Your Score: {score}/10</h3>
            )}
        </div>
    );
};

export default MCQExam;
