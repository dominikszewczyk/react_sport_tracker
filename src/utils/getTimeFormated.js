import { intervalToDuration } from 'date-fns'

export default function getTimeFormated(timeInMilliseconds = 0) {
    const duration = intervalToDuration({ start: 0, end: timeInMilliseconds });

    const hours = String(duration.hours ?? 0).padStart(2, '0');
    const minutes = String(duration.minutes ?? 0).padStart(2, '0');
    const seconds = String(duration.seconds ?? 0).padStart(2, '0');

    if (duration.hours > 0)
        return `${hours}:${minutes}:${seconds}`;
    else
        return `${minutes}:${seconds}`;
}