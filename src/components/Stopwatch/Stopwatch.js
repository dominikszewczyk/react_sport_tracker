import React from 'react'
import getTimeFormated from '../../utils/getTimeFormated';
import useTimer, { timerStates } from '../../hooks/useTimer';

import './Stopwatch.scss';

export default function Stopwatch() {
    const [timeElapsedInMs, timerState, handleTimerAction] = useTimer()

    const timerClassName = (timerState === timerStates.started) ? " button__pause" : " button__start";
    console.log(timerState)

    return (
        <div className="stopwatch">
            <div className="stopwatch__timer">{getTimeFormated(timeElapsedInMs * 10)}</div>
            <div className="stopwatch__buttons">
                <button className={"button" + timerClassName} onClick={() => handleTimerAction(timerState)}></button>
                <button className="button button__reset" onClick={() => handleTimerAction(timerStates.reseted)}></button>
            </div>
        </div>
    )
}
