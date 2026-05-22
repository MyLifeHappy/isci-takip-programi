import { formatMoney } from '../utils/formatUtils';

export default function EmployeeTable({ employees, onEditEmployee, onRemoveEmployee }) {
  return (
    <div className="card table-card">
      <div className="section-title"><h2>İşçi Listesi</h2><p>Aktif personeller ve maaş kartları.</p></div>
      <table>
        <thead><tr><th>Ad Soyad</th><th>Bölüm</th><th>Görev</th><th>Legal</th><th>Ek</th><th>Toplam</th><th>İşlem</th></tr></thead>
        <tbody>{employees.filter((e) => e.active).map((employee) => (
          <tr key={employee.id}>
            <td><strong>{employee.name}</strong><small>{employee.identityNo}</small></td><td>{employee.department}</td><td>{employee.jobTitle}</td><td>{formatMoney(employee.legalSalary)}</td><td>{formatMoney(employee.cashSalary)}</td><td><strong>{formatMoney(employee.legalSalary + employee.cashSalary)}</strong></td>
            <td className="row-actions"><button className="secondary" onClick={() => onEditEmployee(employee)}>Düzenle</button><button className="danger" onClick={() => onRemoveEmployee(employee.id)}>Pasif</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
