import AttendanceForm from '../components/AttendanceForm';
import AttendanceTable from '../components/AttendanceTable';

export default function AttendancePage({ employees, attendance, setAttendance, settings, currentUser }) {
  function addAttendance(row) { setAttendance((prev) => [row, ...prev]); }
  function deleteAttendance(id) { setAttendance((prev) => prev.filter((row) => row.id !== id)); }
  return <div className="page-grid"><AttendanceForm employees={employees} settings={settings} onAddAttendance={addAttendance} currentUser={currentUser} /><AttendanceTable attendance={attendance} employees={employees} onDeleteAttendance={deleteAttendance} currentUser={currentUser} /></div>;
}
