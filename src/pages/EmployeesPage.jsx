import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';

export default function EmployeesPage({ employees, setEmployees }) {
  const [editingEmployee, setEditingEmployee] = useState(null);

  function saveEmployee(employee) {
    setEmployees((prev) => {
      const exists = prev.some((item) => item.id === employee.id);
      if (exists) return prev.map((item) => (item.id === employee.id ? employee : item));
      return [...prev, employee];
    });
    setEditingEmployee(null);
  }

  function removeEmployee(id) {
    setEmployees((prev) => prev.map((employee) => employee.id === id ? { ...employee, active: false } : employee));
  }

  return <div className="page-grid"><EmployeeForm editingEmployee={editingEmployee} onSaveEmployee={saveEmployee} onCancelEdit={() => setEditingEmployee(null)} /><EmployeeTable employees={employees} onEditEmployee={setEditingEmployee} onRemoveEmployee={removeEmployee} /></div>;
}
