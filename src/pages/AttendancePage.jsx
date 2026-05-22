import { useEffect } from "react";
import {
  getAttendance,
  addAttendance,
  deleteAttendance,
} from "../services/attendanceService";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function AttendancePage({
  employees,
  attendance,
  setAttendance,
  settings,
  currentUser,
}) {
  useEffect(() => {
    async function load() {
      const data = await getAttendance();
      setAttendance(data);
    }

    load();
  }, [setAttendance]);

  async function addAttendanceHandler(row) {
    await addAttendance(row);

    const data = await getAttendance();
    setAttendance(data);
  }

  async function deleteAttendanceHandler(id) {
    await deleteAttendance(id);

    const data = await getAttendance();
    setAttendance(data);
  }

  return (
    <div className="page-grid">
      <AttendanceForm
        employees={employees}
        settings={settings}
        onAddAttendance={addAttendanceHandler}
        currentUser={currentUser}
      />

      <AttendanceTable
        attendance={attendance}
        employees={employees}
        onDeleteAttendance={deleteAttendanceHandler}
        currentUser={currentUser}
      />
    </div>
  );
}