const MS_PER_SECOND: number = 1000;
const MS_PER_MINUTE: number = 60000;
const MS_PER_HOUR: number = 3600000;
const MS_PER_DAY: number = 86400000;
const MS_PER_WEEK: number = 604800000;
const MONTH_NUMBER_TO_NAME: Record<number, string> = {
    1: 'Jan',
    2: 'Feb',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
}

// formatTimestamp
// 
// Takes a UNIX timestamp in seconds and converts it into a formatted date
// string. Depending on the time between the timestamp and the current date,
// the date may be expressed as a relative time or as a direct date.
// Specifically, dates earlier than a week will be relative and dates a week or
// older will be direct dates. Dates that are within the current year will not
// include the year.
export function formatTimestamp(timestamp: number): string {
    const timeDelta = Date.now() - (timestamp * MS_PER_SECOND);

    if (timeDelta > MS_PER_WEEK) {
        const timestampDate = new Date(timestamp * MS_PER_SECOND);
        let stringDate = '';

        stringDate += MONTH_NUMBER_TO_NAME[timestampDate.getMonth() + 1];
        // Sidenote but why the fuck is getMonth() 0 indexed that is dumb as 
        // shit bruh
        stringDate += ' ' + timestampDate.getDate();
        if (timestampDate.getFullYear() !== new Date().getFullYear()) {
            stringDate += ', ' + timestampDate.getFullYear();
        }

        return stringDate;
    }

    if (timeDelta > MS_PER_DAY) {
        return pluralizeRelativeTime(timeDelta / MS_PER_DAY, 'day');
    }
    if (timeDelta > MS_PER_HOUR) {
        return pluralizeRelativeTime(timeDelta / MS_PER_HOUR, 'hour');
    }
    if (timeDelta > MS_PER_MINUTE) {
        return pluralizeRelativeTime(timeDelta / MS_PER_MINUTE, 'minute');
    }
    return pluralizeRelativeTime(timeDelta / MS_PER_SECOND, 'second');
}

function pluralizeRelativeTime(units: number, unitName: string): string {
    units = Math.floor(units) || 1; // Round down and make sure units is not 0
    if (units === 1) {
        return units + ' ' + unitName + ' ago'
    }
    return units + ' ' + unitName + 's ago'
}