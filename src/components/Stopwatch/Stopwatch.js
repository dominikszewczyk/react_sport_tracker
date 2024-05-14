import React from 'react'
import getTimeFormated from '../../utils/getTimeFormated';
import useTimer from '../../hooks/useTimer';

import './Stopwatch.scss';

export default function Stopwatch() {
    const [timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset] = useTimer(0)

    return (
        <div className="stopwatch">
            <div className="stopwatch__timer">{getTimeFormated(timer)}</div>
            <div className="stopwatch__buttons">
                {!isActive && <button className="button button__start" onClick={handleStart}></button>}
                {isActive && !isPaused && <button className="button button__pause" onClick={handlePause}></button>}
                {isPaused && <button className="button button__resume" onClick={handleResume}></button>}
                <button className="button button__reset" onClick={handleReset}></button>
            </div>
        </div>
    )
}
