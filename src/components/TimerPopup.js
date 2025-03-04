import React from "react";
import "../styles/TimerPopup.css"; // Add this CSS file for styling

const TimerPopup = ({ isOpen, onClose, onReset, timerName, timerCategory }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>⏳ {timerName} of {timerCategory} Completed!</h2>
                <p>Time’s up! Great job on completing your session.</p>
                <div className="confetti"></div> For animation

                <div className="popup-buttons">
                    {/* <button className="reset-btn" onClick={onReset}>🔄 Reset Timer</button> */}
                    <button className="close-btn" onClick={onClose}>❌ Close</button>
                </div>
            </div>
        </div>
    );
};

export default TimerPopup;
