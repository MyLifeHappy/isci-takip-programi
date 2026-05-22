import { toNumber } from './formatUtils';
import {
  calculateWorkDaysForMonth,
  getEmployeePayrollStartDate,
  getEmployeeWorkDaysForMonth,
  getMonthEnd,
} from './dateUtils';

export function calculateEmployeePayroll(employee, attendanceRows, settings, month, calendarOverrides) {
  const monthWorkDays = calculateWorkDaysForMonth(month, calendarOverrides);
  const employeeWorkDays = getEmployeeWorkDaysForMonth(employee, month, calendarOverrides);
  const payrollStartDate = getEmployeePayrollStartDate(employee, month);
  const payrollEndDate = getMonthEnd(month);

  const rowsAfterStartDate = payrollStartDate
    ? attendanceRows.filter((row) => row.date >= payrollStartDate && row.date <= payrollEndDate)
    : [];

  const totalAbsentHours = rowsAfterStartDate.reduce((sum, row) => sum + toNumber(row.absentHours), 0);
  const totalOvertimeHours = rowsAfterStartDate.reduce((sum, row) => sum + toNumber(row.overtimeHours), 0);
  const totalWorkedHours = rowsAfterStartDate.reduce((sum, row) => sum + toNumber(row.workedHours), 0);

  const normalDailyHours = toNumber(settings.normalDailyHours);
  const monthlyNormalHours = normalDailyHours * monthWorkDays;
  const employeeNormalHours = normalDailyHours * employeeWorkDays;

  const fullLegalSalary = toNumber(employee.legalSalary);
  const fullCashSalary = toNumber(employee.cashSalary);
  const fullTotalSalary = fullLegalSalary + fullCashSalary;

  // Saatlik ücret tam aylık maaşa göre hesaplanır.
  // İşe giriş ayındaysa sadece işe giriş tarihinden sonraki çalışma günleri için baz maaş oluşturulur.
  const hourlyRate = monthlyNormalHours > 0 ? fullTotalSalary / monthlyNormalHours : 0;
  const prorateRatio = monthWorkDays > 0 ? employeeWorkDays / monthWorkDays : 0;
  const legalSalary = fullLegalSalary * prorateRatio;
  const cashSalary = fullCashSalary * prorateRatio;
  const totalSalary = legalSalary + cashSalary;

  const absenceDeduction = hourlyRate * totalAbsentHours;
  const overtimePayment = hourlyRate * toNumber(settings.overtimeMultiplier) * totalOvertimeHours;
  const payableTotal = totalSalary - absenceDeduction + overtimePayment;

  const fullLegalRatio = fullTotalSalary > 0 ? fullLegalSalary / fullTotalSalary : 0;
  const fullCashRatio = fullTotalSalary > 0 ? fullCashSalary / fullTotalSalary : 0;

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
    payableLegal: legalSalary - absenceDeduction * fullLegalRatio + overtimePayment * fullLegalRatio,
    payableCash: cashSalary - absenceDeduction * fullCashRatio + overtimePayment * fullCashRatio,
    payableTotal,
  };
}

export function calculateMonthlyPayroll(employees, attendance, selectedMonth, settings, calendarOverrides) {
  return employees.filter((employee) => employee.active).map((employee) => {
    const rows = attendance.filter((row) => row.employeeId === employee.id && String(row.date || '').startsWith(selectedMonth));
    return calculateEmployeePayroll(employee, rows, settings, selectedMonth, calendarOverrides);
  });
}
