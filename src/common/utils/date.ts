import moment from 'moment-timezone';

/**
 * format the date
 * @param date
 * @returns string September 4, 1986 8:30 PM
 */
const FormatDate = (date: string): string => {
    return moment(date).format('lll');
};

/**
 * format the unix timestamp
 * @param timestamp
 * @returns string September 4, 1986 8:30 PM
 */
const FormatTimestamp = (timestamp: number): string => {
    return moment.unix(timestamp).format('lll');
};

/**
 * format the date
 * @returns string 22:30:00
 * @param time
 */
const FormatTime = (time: string): string => {
    return moment(time).format('LTS');
};

/* Export ==================================================================== */
export { FormatDate, FormatTime, FormatTimestamp };
