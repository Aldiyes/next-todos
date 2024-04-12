import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

export const timeZoneFormatDate = (date: Date) => {
	return new Date(
		formatInTimeZone(date, 'Asia/Jakarta', 'M.d.yyyy HH:mm:ss.SSS'),
	);
};

export const timeZoneFormatString = (date: Date) => {
	return new Intl.DateTimeFormat(['ban', 'id'], {
		dateStyle: 'full',
		timeStyle: 'long',
		timeZone: 'Asia/Jakarta',
	}).format(new Date(date));
};

export const getDateUntil12am = (date: Date) => {
	const currentHour = date.getHours();
	const currentMinute = date.getMinutes();

	if (currentHour >= 23 && currentMinute > 59) {
		return new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() + 1,
			23,
			59,
			59,
			999,
		);
	} else {
		return new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			23,
			59,
			59,
			999,
		);
	}
};
