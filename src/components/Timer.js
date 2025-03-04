import React, { useEffect, useState, useRef } from "react";
import "../../src/styles/Timer.css";
import TimerPopup from "./TimerPopup";

const Timer = ({ duration = 0, category = "", name = "", shouldStart, catChild }) => {
    
    console.log('duration:', duration, 'category:', category, 'catChild:', catChild, 'shouldStart:', shouldStart);

    const [time, setTime] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [wasManuallyPaused, setWasManuallyPaused] = useState(false);
    const [isOpen, setIsOpen] = useState(time === 0);
    const intervalRef = useRef(null); // Stores the timer interval

    // ⏳ Function to start the countdown
    const startTimer = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }
    };

    // ⏹ Function to clear the interval
    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // ✅ Handle tab visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopTimer(); // Pause when switching tabs
            } else if (isRunning) {
                startTimer(); // Resume only if running
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isRunning]);

    // 🔄 Start when "Start All" is clicked, but only if not manually paused
    useEffect(() => {
        const isActive = catChild === category;
        if (shouldStart && isActive && !wasManuallyPaused) {
            setIsRunning(true);
        }
    }, [shouldStart, catChild, category, wasManuallyPaused]);

    // 🎯 Manage the timer lifecycle
    useEffect(() => {
        if (isRunning) {
            startTimer();
        } else {
            stopTimer();
        }

        return () => stopTimer(); // Cleanup when unmounting
    }, [isRunning]);

    // ⏪ Reset timer when duration changes
    useEffect(() => {
        setTime(duration);
        stopTimer();
        setIsRunning(false);
    }, [duration]);

    // 🔘 Control functions
    const start = () => {
        setIsRunning(true);
        setWasManuallyPaused(false);
    };

    const pause = () => {
        setIsRunning(false);
        setWasManuallyPaused(true);
    };

    const reset = () => {
        setIsRunning(false);
        setTime(duration);
        setWasManuallyPaused(false);
    };

    useEffect(() => {
        setIsOpen(time === 0)
    }, [time])

    const onClose = () => {
        setIsOpen(false);
    }

    if(isOpen)
        return <TimerPopup isOpen={isOpen} timerName={name} timerCategory={category} onClose={onClose} />
    
    return (
        <div className="timer-card">
            <h3>{name}</h3>
            <div className="timer">
                <h3 className="numbers">
                    {String(Math.floor(time / 3600)).padStart(2, "0")}:
                    {String(Math.floor((time % 3600) / 60)).padStart(2, "0")}:
                    {String(time % 60).padStart(2, "0")}
                </h3>
            </div>
            <div className="buttons">
                <button onClick={start} disabled={isRunning}>Start</button>
                <button onClick={pause} disabled={!isRunning}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
