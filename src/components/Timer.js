import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "../../src/styles/Timer.css";
import TimerPopup from "./TimerPopup";
import { addCompletedTimer } from '../app/timersSlice';

const Timer = ({ duration = 0, category = "", name = "", shouldStart, catChild }) => {
    const dispatch = useDispatch();

    const [time, setTime] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [wasManuallyPaused, setWasManuallyPaused] = useState(false);
    const [isOpen, setIsOpen] = useState(time === 0);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }
    };


    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

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

    useEffect(() => {
        const isActive = catChild === category;
        if (shouldStart && isActive && !wasManuallyPaused) {
            setIsRunning(true);
        }
    }, [shouldStart, catChild, category, wasManuallyPaused]);

    useEffect(() => {
        if (isRunning) {
            startTimer();
        } else {
            stopTimer();
        }

        return () => stopTimer();
    }, [isRunning]);


    useEffect(() => {
        setTime(duration);
        stopTimer();
        setIsRunning(false);
    }, [duration]);


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
        if (time === 0) {
            setIsOpen(true);
            dispatch(addCompletedTimer({
                name,
                category,
                duration
            }));
        }
    }, [time, dispatch, name, category, duration]);
    

    const onClose = () => {
        setIsOpen(false);
    }

    if (isOpen)
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
