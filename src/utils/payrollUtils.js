import { toNumber } from './formatUtils';
import {
  calculateWorkDaysForMonth,
  getEmployeePayrollStartDate,
  getEmployeeWorkDaysForMonth,
  getMonthEnd,
} from './dateUtils';

export function calculateEmployeePayroll(
  employee,
  attendanceRows,
  settings,
  month,
  calendarOverrides
) {
  const monthWorkDays = calculateWorkDaysForMonth(month, calendarOverrides);
  const employeeWorkDays = getEmployeeWorkDaysForMonth(
    employee,
    month,
    calendarOverrides
  );

  const payrollStartDate = getEmployeePayrollStartDate(employee, month);
  const payrollEndDate = getMonthEnd(month);

  const rowsAfterStartDate = payrollStartDate
    ? attendanceRows.filter(
        (row) => row.date >= payrollStartDate && row.date <= payrollEndDate
      )
    : [];

  const totalAbsentHours = rowsAfterStartDate.reduce(
    (sum, row) => sum + toNumber(row.absentHours),
    0
  );

  const totalOvertimeHours = rowsAfterStartDate.reduce(
    (sum, row) => sum + toNumber(row.overtimeHours),
    0
  );

  const totalWorkedHours = rowsAfterStartDate.reduce(
    (sum, row) => sum + toNumber(row.workedHours),
    0
  );

  const normalDailyHours = toNumber(settings.normalDailyHours);
  const monthlyNormalHours = normalDailyHours * monthWorkDays;
  const employeeNormalHours = normalDailyHours * employeeWorkDays;

  const fullLegalSalary = toNumber(employee.legalSalary);
  const fullCashSalary = toNumber(employee.cashSalary);
  const fullTotalSalary = fullLegalSalary + fullCashSalary;

  const prorateRatio = monthWorkDays > 0 ? employeeWorkDays / monthWorkDays : 0;

  const legalSalary = fullLegalSalary * prorateRatio;
  const cashSalary = fullCashSalary * prorateRatio;
  const totalSalary = legalSalary + cashSalary;

  // Gerçek saatlik maliyet:
  // Legal + elden toplam maaş / aylık net çalışma saati
  const hourlyRate =
    monthlyNormalHours > 0 ? fullTotalSalary / monthlyNormalHours : 0;

  // Kesinti ve mesai gerçek maliyetten hesaplanır.
  // Ama ikisi de sadece elden/ek maaşa yansıtılır.
  const absenceDeduction = hourlyRate * totalAbsentHours;

  const overtimePayment =
    hourlyRate * toNumber(settings.overtimeMultiplier) * totalOvertimeHours;

  const payableLegal = legalSalary;
  const payableCash = cashSalary - absenceDeduction + overtimePayment;
  const payableTotal = payableLegal + payableCash;

  return {
    employee,
    payrollStartDate,
    payrollEndDate,

    monthWorkDays,
    employeeWorkDays,
    prorateRatio,

    fullLegalSalary,
    fullCashSalary,
    fullTotalSalary,

    legalSalary,
    cashSalary,
    totalSalary,

    workDays: employeeWorkDays,
    monthlyNormalHours,
    employeeNormalHours,

    totalWorkedHours,
    totalAbsentHours,
    totalOvertimeHours,

    hourlyRate,
    absenceDeduction,
    overtimePayment,

    payableLegal,
    payableCash,
    payableTotal,
  };
}

export function calculateMonthlyPayroll(
  employees,
  attendance,
  selectedMonth,
  settings,
  calendarOverrides
) {
  return employees
    .filter((employee) => employee.active)
    .map((employee) => {
      const rows = attendance.filter(
        (row) =>
          row.employeeId === employee.id &&
          String(row.date || '').startsWith(selectedMonth)
      );

      return calculateEmployeePayroll(
        employee,
        rows,
        settings,
        selectedMonth,
        calendarOverrides
      );
    });
}