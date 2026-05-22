import { formatMoney } from '../utils/formatUtils';

export default function PayrollSummaryTable({ payrollRows, onSelectEmployee }) {
  return (
    <div className="card table-card">
      <div className="section-title">
        <h2>Aylık Maaş Özeti</h2>
        <p>Normal maaş tam kabul edilir; işe giriş tarihi varsa ilgili ayda giriş tarihinden sonrası hesaplanır. Sadece devamsızlık düşülür, mesai eklenir.</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>İşçi</th>
            <th>İşe Giriş</th>
            <th>Ay Günü</th>
            <th>Hak Ediş Günü</th>
            <th>Hesaplanan Maaş</th>
            <th>Kesinti Saat</th>
            <th>Kesinti</th>
            <th>Mesai Saat</th>
            <th>Mesai</th>
            <th>Ödenecek</th>
            <th>Bordro</th>
          </tr>
        </thead>
        <tbody>
          {payrollRows.map((row) => (
            <tr key={row.employee.id}>
              <td><strong>{row.employee.name}</strong><small>{row.employee.department}</small></td>
              <td>{row.employee.startDate || '-'}</td>
              <td>{row.monthWorkDays}</td>
              <td>{row.employeeWorkDays}</td>
              <td>{formatMoney(row.totalSalary)}</td>
              <td>{row.totalAbsentHours}</td>
              <td>{formatMoney(row.absenceDeduction)}</td>
              <td>{row.totalOvertimeHours}</td>
              <td>{formatMoney(row.overtimePayment)}</td>
              <td><strong>{formatMoney(row.payableTotal)}</strong></td>
              <td><button onClick={() => onSelectEmployee(row.employee.id)}>Bordro Aç</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
