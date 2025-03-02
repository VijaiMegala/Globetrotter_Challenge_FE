import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import ChallengeFriendModal from "./components/ChallengeFriend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
    const [destinations, setDestinations] = useState([]);
    const [currentDestination, setCurrentDestination] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [showConfetti, setShowConfetti] = useState(false);
    const [showSadFace, setShowSadFace] = useState(false);
    const [funFact, setFunFact] = useState("");
    const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
    const [questionCount, setQuestionCount] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/destinations");
            setDestinations(response.data);
            selectRandomDestination(response.data);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
    };

    const selectRandomDestination = (destinations) => {
        const randomIndex = Math.floor(Math.random() * destinations.length);
        const correctDestination = destinations[randomIndex];
        setCurrentDestination(correctDestination);

        const otherDestinations = destinations.filter((_, index) => index !== randomIndex);
        const shuffledOtherDestinations = otherDestinations.sort(() => 0.5 - Math.random());
        const options = [correctDestination, ...shuffledOtherDestinations.slice(0, 2)];

        const shuffledOptions = options.sort(() => 0.5 - Math.random());

        setFunFact("");
        setShowConfetti(false);
        setShowSadFace(false);
        setOptions(shuffledOptions);
    };

    const handleAnswer = (answer) => {
        if (isAnswered) return; 
        setIsAnswered(true);
        setSelectedAnswer(answer);
        if (answer === currentDestination.city) {
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
            setShowConfetti(true);
        } else {
            setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
            setShowSadFace(true);
        }
        setFunFact(currentDestination.fun_fact[0]);
    };

    const nextQuestion = () => {
        if (!isAnswered) {
            toast.error("Please answer the question before moving to the next one!");
            return;
        }
        if (questionCount < 9) {
            setQuestionCount((prev) => prev + 1);
            selectRandomDestination(destinations);
            setIsAnswered(false);
        }
    };

    const handleSubmit = () => {
        setIsChallengeModalOpen(true);
    };

    return (
        <>
            <ToastContainer className="toast-container" />
                {showConfetti && <Confetti />}
            <div className="app">
                <h1>🌍 Globetrotter Challenge</h1>
                {showSadFace && <div className="sad-face">😢</div>}
                {currentDestination && (
                    <div className="game">
                        <h2>Guess the Destination!</h2>
                        <p className="clue">{currentDestination.clues[0]}</p>
                        <div className="options">
                            {options.map((dest) => (
                                <button
                                    key={dest.city}
                                    onClick={() => handleAnswer(dest.city)}
                                    className={isAnswered && selectedAnswer && dest.city !== currentDestination.city ? "incorrect-option" : ""}
                                >
                                    {dest.city} / {dest.country}
                                </button>
                            ))}
                        </div>
                        {funFact && <p className="fun-fact">✨ Fun Fact: {funFact}</p>}
                        {questionCount < 9 ? (
                            <button className="next-button" onClick={nextQuestion}>
                                Next Destination
                            </button>
                        ) : (
                            <button className="submit-button" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}
                    </div>
                )}
                <div className="score">
                    <p>✅ Correct: {score.correct}</p>
                    <p>❌ Incorrect: {score.incorrect}</p>
                    <p>Score: {((score.correct / 10) * 100).toFixed(2)}%</p>
                    <button className="challenge-button" onClick={() => setIsChallengeModalOpen(true)}>
                        Challenge a Friend
                    </button>
                    <ChallengeFriendModal
                        score={score}
                        isOpen={isChallengeModalOpen}
                        onRequestClose={() => setIsChallengeModalOpen(false)}
                    />
                </div>
            </div>
        </>
    );
};

export default App;