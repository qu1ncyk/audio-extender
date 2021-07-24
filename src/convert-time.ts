export function secondsToTime(totalSeconds: number, round = true) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor(totalSeconds / 60 % 60);
    let seconds = totalSeconds % 60;
    if (round) seconds = Math.floor(seconds);
    else seconds = Math.round(seconds * 1000) / 1000;

    if (hours > 0)
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

export function timeToSeconds(time: string) {
    let timeArray = time.split(":");
    if (timeArray.length === 1)
        return Number(timeArray[0]);
    else if (timeArray.length === 2)
        return Number(timeArray[0]) * 60 + Number(timeArray[1]);
    else if (timeArray.length === 3)
        return Number(timeArray[0]) * 3600 + Number(timeArray[1]) * 60 + Number(timeArray[2]);
    else return NaN;
}