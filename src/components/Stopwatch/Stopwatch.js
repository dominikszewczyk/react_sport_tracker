import React from 'react'
import getTimeFormated from '../../utils/getTimeFormated';
import useTimer, { timerStates } from '../../hooks/useTimer';

import './Stopwatch.scss';

export default function Stopwatch() {
    const [timeElapsedInMs, timerState, handleTimerAction] = useTimer()

    const timerClassName = (timerState === timerStates.started) ? " button__stopwatch--pause" : " button__stopwatch--start";
    
    function handleSaveClick() {
        
    }

    return (
        <div className="stopwatch">
            <div className="stopwatch__timer">{getTimeFormated(timeElapsedInMs * 10)}</div>
            <div className="stopwatch__buttons">
                <button className={"button__stopwatch" + timerClassName} onClick={() => handleTimerAction(timerState)}></button>
                {/* <button className="button__stopwatch button__stopwatch--reset" onClick={() => handleTimerAction(timerStates.reseted)}></button> */}
            </div>
            <button className="button" onClick="handleSaveClick">Save</button>
        </div>
    )
}
