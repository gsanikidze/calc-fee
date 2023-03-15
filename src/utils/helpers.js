export function roundFee(amount) {
  return Number((Math.ceil(amount * 100) / 100).toFixed(2));
}

export function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export function isInSameWeek(dateOne, dateTwo) {
  const d1 = new Date(dateOne);
  const d2 = new Date(dateTwo);
  const week1 = getWeekNumber(d1);
  const week2 = getWeekNumber(d2);
  const year1 = d1.getFullYear();
  const year2 = d2.getFullYear();
  return year1 === year2 && week1 === week2;
}
