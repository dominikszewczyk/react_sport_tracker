import { useState, useRef } from 'react';

export default function useTimer(initialStatus = 0) {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef();

    const handleStart = () => {
        setIsActive(true);
        intervalRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 10)
    };

    const handlePause = () => {
        clearInterval(intervalRef.current);
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false)
        intervalRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 10)
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
    };

    return [ timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset ]
}
