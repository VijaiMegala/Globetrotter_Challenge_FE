import React, { useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import Modal from "react-modal";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;
const ChallengeFriendModal = ({ score, isOpen, onRequestClose }) => {
    const [username, setUsername] = useState("");
    const [registered, setRegistered] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [isGeneratingShareImage, setIsGeneratingShareImage] = useState(true);

    const handleRegister = async () => {
        if (!username) return toast.error("Please enter a username");
        try {
            const response = await axios.post(`${apiUrl}/register`, { username });
            toast.success(response.data.message);
            setRegistered(true);
        } catch (error) {
            toast.error(error.response?.data?.error || "Registration failed");
        }
    };

    const generateShareImage = async () => {

        const element = document.getElementById("share-content");
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png");
        setShareImage(image);
        setInviteLink(`${window.location.origin}/challenge/${username}`);
    };

    const handleShare = () => {
        if (!registered) return toast.error("Please register first");
        generateShareImage();
        setIsGeneratingShareImage(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Challenge a Friend"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="challenge-friend-modal">
                <h2>Challenge a Friend</h2>
                <button className="close-button" onClick={onRequestClose}>
                    ×
                </button>
                {!registered ? (
                    <div className="register-form">
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={handleRegister}>Register</button>
                    </div>
                ) : (
                    <div className="share-section">
                        {isGeneratingShareImage ? (
                            <>
                                <div id="share-content" className="share-content">
                                    <h3>🌍 Globetrotter Challenge</h3>
                                    <p>Challenge by: {username}</p>
                                    <p>✅ Correct: {score.correct}</p>
                                    <p>❌ Incorrect: {score.incorrect}</p>
                                <p>Score: {((score.correct / 10) * 100).toFixed(2)}%</p>
                                <p>Click the link to play: {inviteLink}</p>
                            </div>
                            <button className="modalButton" onClick={handleShare}>Generate Shareable Image</button>
                            </>
                        ) : 
                        (
                            shareImage && (
                                <>
                                    <div className="share-popup">
                                        <div className="share-image-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                            <img src={shareImage} alt="Shareable Challenge" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                        <a
                                            href={`https://api.whatsapp.com/send?text=Join%20my%20Globetrotter%20Challenge!%20${encodeURIComponent(inviteLink)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Share on WhatsApp
                                        </a>
                                    </div>
                                    <button className="modalButton" onClick={() => setIsGeneratingShareImage(true)}>back</button>
                                </>
                            )
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ChallengeFriendModal;