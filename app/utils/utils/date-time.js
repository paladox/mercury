/**
 * @desc Helper functions to deal with Date and time
 */

/**
 * Interval types
 */
var Interval = {
	Now: 0,
	Second: 1,
	Minute: 2,
	Hour: 3,
	Day: 4,
	Month: 5,
	Year: 6
};

/**
 * Returns Interval type and value given two dates
 *
 * @param from Date in the past
 * @param to Optional date in the future. Defaults to current date/time
 * @returns TimeAgoResult
 */
export default function timeAgo (from, to = new Date()) {
	var timeDiff = Math.floor((to.getTime() - from.getTime()) / 1000);

	if (timeDiff == 0) {
		return {
			type: Interval.Now,
			value: 0
		};
	}
	// seconds
	if (timeDiff < 60) {
		return {
			type: Interval.Second,
			value: timeDiff
		};
	}
	// minutes
	timeDiff = Math.floor(timeDiff / 60);
	if (timeDiff < 60) {
		return {
			type: Interval.Minute,
			value: timeDiff
		};
	}
	// hours
	timeDiff = Math.floor(timeDiff / 60);
	if (timeDiff < 24) {
		return {
			type: Interval.Hour,
			value: timeDiff
		}
	}
	// days
	timeDiff = Math.floor(timeDiff / 24);
	if (timeDiff < 30) {
		return {
			type: Interval.Day,
			value: timeDiff
		}
	}
	// months
	timeDiff = Math.floor(timeDiff / 30);
	if (timeDiff < 12) {
		return {
			type: Interval.Month,
			value: timeDiff
		}
	}
	// years
	timeDiff = Math.floor(timeDiff / 12);
	return {
		type: Interval.Year,
		value: timeDiff
	}
}
