import React from "react";
import {useTimer} from "react-timer-hook";

interface TimerProps {
    expirationTime: Date,
    expireCallback?: () => void
}
const Timer: React.FC<TimerProps> = ({ expirationTime, expireCallback }) => {
    const {
        seconds,
        minutes,
        hours,
        days
    } = useTimer({expiryTimestamp: expirationTime, onExpire: () => expireCallback ? expireCallback() : null})

    return (
        <div>
            {days.toLocaleString(undefined, {minimumIntegerDigits: 2})} J&nbsp;
            {hours.toLocaleString(undefined, {minimumIntegerDigits: 2})} H&nbsp;
            {minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})} m&nbsp;
            {seconds.toLocaleString(undefined, {minimumIntegerDigits: 2})} s&nbsp;
        </div>
    )
}

export default Timer;