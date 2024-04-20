import { useState, useRef } from 'react';

export const timerStates = {
    new: "new",
    started: "started",
    paused: "paused",
    reseted: "reseted"
}

export default function useTimer(initialStatus = 0) {
    const [timeElapsedInMs, setTimeElapsedInMs] = useState(0);
    const [timerState, setTimerState] = useState(timerStates.new)
    const intervalRef = useRef();

    const handleTimerAction = (action) => {
        if (action === timerStates.new || action === timerStates.paused) {
            setTimerState(timerStates.started);
            intervalRef.current = setInterval(() => {
                setTimeElapsedInMs((timeElapsedInMs) => timeElapsedInMs + 1);
            }, 10);
        }
        
        if (action === timerStates.started) {
            clearInterval(intervalRef.current);
            setTimerState(timerStates.paused);
        }
        
        if (action === timerStates.reseted) {
            clearInterval(intervalRef.current);
            setTimerState(timerStates.new);
            setTimeElapsedInMs(0);
        }
    }

    return [timeElapsedInMs, timerState, handleTimerAction]
}
