export default function AttendanceTable({ attendance, employees, onDeleteAttendance, currentUser }) {
  const getName = (id) => employees.find((e) => e.id === id)?.name || '-';
  return (
    <div className="card table-card">
      <div className="section-title"><h2>Puantaj Kayıtları</h2><p>Devamsızlık, izin, rapor ve mesai kayıtları.</p></div>
      <table>
        <thead><tr><th>Tarih</th><th>İşçi</th><th>Durum</th><th>Çalışılan</th><th>Kesinti</th>{currentUser.role === 'admin' && <th>Mesai</th>}<th>Not</th><th>Giren</th>{currentUser.role === 'admin' && <th>İşlem</th>}</tr></thead>
        <tbody>{attendance.map((row) => (
          <tr key={row.id}><td>{row.date}</td><td>{getName(row.employeeId)}</td><td><span className="status-pill">{row.status}</span></td><td>{row.workedHours}</td><td>{row.absentHours}</td>{currentUser.role === 'admin' && <td>{row.overtimeHours}</td>}<td>{row.note}</td><td>{row.createdBy || '-'}</td>{currentUser.role === 'admin' && <td><button className="danger" onClick={() => onDeleteAttendance(row.id)}>Sil</button></td>}</tr>
        ))}</tbody>
      </table>
    </div>
  );
}
