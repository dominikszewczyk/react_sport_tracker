import React from 'react'

import './Statistics.scss'

export default function Statistics() {
    return (
        <div className="statistics">
            <div className="statistic statistic--calories">
                <div className="statistic__header">
                    Calories
                </div>
                <div className="statistic__value">
                    1200
                    <span className="statistic__value--sub">kcal</span>
                </div>
            </div>
            <div className="statistic statistic--heartrate">
                <div className="statistic__header">
                    Heartrate
                </div>
                <div className="statistic__value">
                    123
                    <span className="statistic__value--sub">bmp</span>
                </div>
            </div>
        </div>
    )
}
