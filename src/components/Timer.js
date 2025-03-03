import React, { useEffect, useState } from 'react';
import "../../src/styles/Timer.css"

const Timer = ({
    duration = 0,
    category = "",
    name = "",
    shouldStart,
    catChild
}) => {
    shouldStart = shouldStart && catChild === category;
    // console.log('catchild, category, final ', catChild, category, shouldStart)
    const [time, setTime] = useState(duration)
    const [shouldPause, setShouldPause] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [run, setRun] = useState(shouldStart);
    // const [completed, setCompleted] = useState(false);

    const hours = Math.floor(time / 3600);
    let remSec = time % 3600; 
    const minutes = Math.floor(remSec / 60);
    const seconds = remSec % 60;

    useEffect(() => {
        const id = ((shouldStart || run) && !shouldPause && !shouldReset) && setInterval(() => {
            setTime(time > 1 ? time - 1 : 0)
        }, 1000)
        
        return () => {
            clearInterval(id) 
        }
    }, [time, run, shouldStart, shouldPause, shouldReset])

    const start = () => {
        setRun(true);
        setShouldReset(false);
        setShouldPause(false);
    }

    const pause = () => {
        setRun(false);
        setShouldPause(true);
        setShouldReset(false);
    }

    const reset = () => {
        setRun(false);
        setShouldPause(false);
        setShouldReset(true);
        setTime(duration);
    }

    return (
        <div className='timer-card'>
            <h3>{name}</h3>
            <div className='timer'>
                <h3 className='numbers'>{hours} : {minutes} : {seconds}</h3>
            </div>
            <div className='buttons'>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
            {/* {completed && (<h3>Completed</h3>)} */}
        </div>
    )
}

export default Timer
