import { useEffect, useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import AttendancePage from './pages/AttendancePage';
import PayrollPage from './pages/PayrollPage';
import SettingsPage from './pages/SettingsPage';
import { DEFAULT_SETTINGS, INITIAL_ATTENDANCE, INITIAL_CALENDAR_OVERRIDES, INITIAL_EMPLOYEES } from './data/initialData';
import { loadState, saveState } from './utils/storageUtils';
import './styles/app.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => loadState('feha_current_user', null));
  const [currentPage, setCurrentPage] = useState(currentUser?.role === 'admin' ? 'dashboard' : 'attendance');
  const [settings, setSettings] = useState(() => loadState('feha_settings', DEFAULT_SETTINGS));
  const [employees, setEmployees] = useState(() => loadState('feha_employees', INITIAL_EMPLOYEES));
  const [attendance, setAttendance] = useState(() => loadState('feha_attendance', INITIAL_ATTENDANCE));
  const [calendarOverrides, setCalendarOverrides] = useState(() => loadState('feha_calendar_overrides', INITIAL_CALENDAR_OVERRIDES));

  useEffect(() => saveState('feha_current_user', currentUser), [currentUser]);
  useEffect(() => saveState('feha_settings', settings), [settings]);
  useEffect(() => saveState('feha_employees', employees), [employees]);
  useEffect(() => saveState('feha_attendance', attendance), [attendance]);
  useEffect(() => saveState('feha_calendar_overrides', calendarOverrides), [calendarOverrides]);

  function handleLogin(user) {
    setCurrentUser(user);
    setCurrentPage(user.role === 'admin' ? 'dashboard' : 'attendance');
  }

  function handleLogout() {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  }

  if (!currentUser) return <Login onLogin={handleLogin} />;

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} currentUser={currentUser} onLogout={handleLogout}>
      {currentPage === 'dashboard' && currentUser.role === 'admin' && <DashboardPage employees={employees} attendance={attendance} settings={settings} calendarOverrides={calendarOverrides} />}
      {currentPage === 'employees' && currentUser.role === 'admin' && <EmployeesPage employees={employees} setEmployees={setEmployees} />}
      {currentPage === 'attendance' && <AttendancePage employees={employees} attendance={attendance} setAttendance={setAttendance} settings={settings} currentUser={currentUser} />}
      {currentPage === 'payroll' && currentUser.role === 'admin' && <PayrollPage employees={employees} attendance={attendance} settings={settings} calendarOverrides={calendarOverrides} />}
      {currentPage === 'settings' && currentUser.role === 'admin' && <SettingsPage settings={settings} setSettings={setSettings} calendarOverrides={calendarOverrides} setCalendarOverrides={setCalendarOverrides} />}
    </Layout>
  );
}
