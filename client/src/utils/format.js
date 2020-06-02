import numeral from 'numeral';

export const secondsToTimestamp = seconds => {
	return numeral(seconds).format('00:00:00');
}
