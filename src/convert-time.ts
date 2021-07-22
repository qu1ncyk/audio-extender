export function secondsToTime(totalSeconds: number, round = true) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor(totalSeconds / 60 % 60);
    let seconds = totalSeconds % 60;
    if (round) seconds = Math.floor(seconds);

    if(hours > 0)
        return `${hours}:${doubleDigit(minutes)}:${doubleDigit(seconds)}`;
    else
        return `${minutes}:${doubleDigit(seconds)}`;
}

function doubleDigit(num: number) {
    if (num < 10)
        return "0" + num;
    else
        return String(num);
}