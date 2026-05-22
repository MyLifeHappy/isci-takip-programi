import { formatMoney } from '../utils/formatUtils';
import { calculateMonthlyPayroll } from '../utils/payrollUtils';

export default function DashboardPage({ employees, attendance, settings, calendarOverrides }) {
  const selectedMonth = new Date().toISOString().slice(0, 7);
  const payrollRows = calculateMonthlyPayroll(employees, attendance, selectedMonth, settings, calendarOverrides);
  const totalPayable = payrollRows.reduce((sum, row) => sum + row.payableTotal, 0);
  const totalAbsence = payrollRows.reduce((sum, row) => sum + row.totalAbsentHours, 0);
  const totalOvertime = payrollRows.reduce((sum, row) => sum + row.totalOvertimeHours, 0);

  return (
    <div className="page-grid">
      <div className="hero-card"><div><h1>FEHA GRUP Bordro Paneli</h1><p>İşçi kayıtları, puantaj, mesai ve aylık bordro yönetimi.</p></div></div>
      <div className="stats-grid">
        <div className="stat-card"><span>Aktif İşçi</span><strong>{employees.filter((e) => e.active).length}</strong></div>
        <div className="stat-card"><span>Bu Ay Ödenecek</span><strong>{formatMoney(totalPayable)}</strong></div>
        <div className="stat-card"><span>Kesinti Saati</span><strong>{totalAbsence}</strong></div>
        <div className="stat-card"><span>Mesai Saati</span><strong>{totalOvertime}</strong></div>
      </div>
    </div>
  );
}
