import { useMemo, useState } from 'react';
import PayrollSummaryTable from '../components/PayrollSummaryTable';
import PayrollSlip from '../components/PayrollSlip';
import { calculateMonthlyPayroll } from '../utils/payrollUtils';
import { calculateWorkDaysForMonth } from '../utils/dateUtils';

export default function PayrollPage({ employees, attendance, settings, calendarOverrides }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const payrollRows = useMemo(() => calculateMonthlyPayroll(employees, attendance, selectedMonth, settings, calendarOverrides), [employees, attendance, selectedMonth, settings, calendarOverrides]);
  const selectedPayroll = payrollRows.find((row) => String(row.employee.id) === String(selectedEmployeeId));
  const workDays = calculateWorkDaysForMonth(selectedMonth, calendarOverrides);

  return (
    <div className="page-grid">
      <div className="card toolbar-card">
        <label>Maaş Dönemi<input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} /></label>
        <div className="info-chip">Hafta içi çalışma günü: <strong>{workDays}</strong></div>
        <small>Hesaplama Pazartesi-Cuma günlerini otomatik sayar. Bayram/tatil veya cumartesi çalışma eklemeleri Ayarlar sayfasından yapılır.</small>
      </div>
      <PayrollSummaryTable payrollRows={payrollRows} onSelectEmployee={setSelectedEmployeeId} />
      <PayrollSlip payroll={selectedPayroll} selectedMonth={selectedMonth} settings={settings} />
    </div>
  );
}
