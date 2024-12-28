export function utcToIst(utcDate) {
    const utcTime = new Date(utcDate);
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours * 60 minutes * 60 seconds * 1000 milliseconds
    const istTime = new Date(utcTime.getTime() + istOffset);
    return istTime;
}
