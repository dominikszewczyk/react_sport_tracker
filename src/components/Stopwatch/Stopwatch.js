import { useEffect, useState } from 'react';
import React from 'react'
import getTimeFormated from '../../utils/getTimeFormated';
import useTimer, { timerStates } from '../../hooks/useTimer';

import './Stopwatch.scss';

export default function Stopwatch({ workout, returnButton }) {
    const [timeElapsedInMs, timerState, handleTimerAction] = useTimer()

    const timerClassName = (timerState === timerStates.started) ? " button__stopwatch--pause" : " button__stopwatch--start";

    function handleSaveClick() {
        console.log(workout.id);
        const date = {
            id: '',
            workoutId: workout.id,
            categoryId: workout.categoryId,
            timeElapsedInMs: timeElapsedInMs
        }

        fetch(`http://localhost:3001/trainings`, {
            method: "POST",
            body: JSON.stringify(date),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                handleTimerAction("stopped");
                returnButton();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="stopwatch">
            <div className="stopwatch__timer">{getTimeFormated(timeElapsedInMs)}</div>
            <div className="stopwatch__buttons">
                <button className={"button__stopwatch" + timerClassName} onClick={() => handleTimerAction(timerState)}></button>
                {/* <button className="button__stopwatch button__stopwatch--reset" onClick={() => handleTimerAction(timerStates.reseted)}></button> */}
            </div>
            <button className="button" onClick={handleSaveClick}>Save</button>
        </div>
    )
}
