export default function getTimeFormated(time = 0) {
    let timeSplitted = {
        days: Math.floor(time / (100 * 60 * 60 * 24)),
        hours: Math.floor((time / (100 * 60 * 60)) % 24),
        minutes: Math.floor((time / (100 * 60)) % 60),
        seconds: Math.floor((time / (100)) % 60)
    };

    let timeFormated = {
        days: timeSplitted.days.toString(),
        hours: timeSplitted.hours.toString().padStart(2, '0'),
        minutes: timeSplitted.minutes.toString().padStart(2, '0'),
        seconds: timeSplitted.seconds.toString().padStart(2, '0'),
    };

    if (timeFormated.hours > 0)
        return `${timeFormated.hours}:${timeFormated.minutes}:${timeFormated.seconds}`;
    else
        return `${timeFormated.minutes}:${timeFormated.seconds}`;
}