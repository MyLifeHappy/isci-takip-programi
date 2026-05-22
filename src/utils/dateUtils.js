export function getMonthParts(month) {
  const [year, monthIndex] = month.split('-').map(Number);
  return { year, monthIndex };
}

export function pad2(value) {
  return String(value).padStart(2, '0');
}

export function formatLocalDate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function getMonthDates(month) {
  const { year, monthIndex } = getMonthParts(month);
  const date = new Date(year, monthIndex - 1, 1, 12, 0, 0);
  const dates = [];

  while (date.getMonth() === monthIndex - 1) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export function getMonthStart(month) {
  const { year, monthIndex } = getMonthParts(month);
  return `${year}-${pad2(monthIndex)}-01`;
}

export function getMonthEnd(month) {
  const dates = getMonthDates(month);
  return formatLocalDate(dates[dates.length - 1]);
}

export function toDateInput(date) {
  return formatLocalDate(date);
}

export function getWeekday(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return date.getDay();
}

export function isDefaultWorkday(dateString) {
  const day = getWeekday(dateString);
  return day >= 1 && day <= 5;
}

export function filterOverridesForRange(overrides = [], startDate, endDate) {
  return overrides.filter((item) => item.date >= startDate && item.date <= endDate);
}

export function calculateWorkDaysInRange(startDate, endDate, overrides = []) {
  if (!startDate || !endDate || startDate > endDate) return 0;

  const overrideMap = new Map(
    filterOverridesForRange(overrides, startDate, endDate).map((item) => [item.date, item.type])
  );

  const date = new Date(`${startDate}T12:00:00`);
  const finalDate = new Date(`${endDate}T12:00:00`);
  let count = 0;

  while (date <= finalDate) {
    const dateString = formatLocalDate(date);
    const overrideType = overrideMap.get(dateString);

    if (overrideType === 'holiday') {
      // Bayram / tatil: çalışma günü sayılmaz.
    } else if (overrideType === 'workday') {
      // Cumartesi/pazar olsa bile ekstra çalışma günü sayılır.
      count += 1;
    } else if (isDefaultWorkday(dateString)) {
      count += 1;
    }

    date.setDate(date.getDate() + 1);
  }

  return count;
}

export function calculateWorkDaysForMonth(month, overrides = []) {
  return calculateWorkDaysInRange(getMonthStart(month), getMonthEnd(month), overrides);
}

export function getEmployeePayrollStartDate(employee, month) {
  const monthStart = getMonthStart(month);
  const monthEnd = getMonthEnd(month);
  const startDate = employee.startDate || monthStart;

  if (startDate > monthEnd) return null;
  return startDate > monthStart ? startDate : monthStart;
}

export function getEmployeeWorkDaysForMonth(employee, month, overrides = []) {
  const startDate = getEmployeePayrollStartDate(employee, month);
  if (!startDate) return 0;
  return calculateWorkDaysInRange(startDate, getMonthEnd(month), overrides);
}

export function getMonthLabel(month) {
  const { year, monthIndex } = getMonthParts(month);
  return new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(new Date(year, monthIndex - 1, 1));
}
