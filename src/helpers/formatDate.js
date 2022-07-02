import { DateTime } from 'luxon';

function formateDate(date) {
  const lastSeenDate = DateTime.fromISO(date, {
    locale: 'pt-BR'
  });
  const currentDate = DateTime.now();

  const diffInDays = currentDate.diff(lastSeenDate, 'days');

  return currentDate.minus({days: diffInDays.toObject().days})
    .setLocale('pt-BR')
    .toRelative();
}

export { formateDate };
