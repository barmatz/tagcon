import numeral from 'numeral';

export const secondsToTimestamp = seconds => numeral(seconds).format('00:00:00');

export const resolveUrl = url => /^\w*:\/\/\w/.test(url) ? url : `http://${url}`;
