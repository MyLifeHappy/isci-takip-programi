import { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function EmployeesPage({ employees, setEmployees }) {
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getEmployees();
      setEmployees(data);
    }

    load();
  }, [setEmployees]);

  async function saveEmployee(employee) {
  if (editingEmployee) {
    await updateEmployee(employee.id, employee);
  } else {
    await addEmployee(employee);
  }

  const data = await getEmployees();
  setEmployees(data);
  setEditingEmployee(null);
}

  async function removeEmployee(id) {
    await deleteEmployee(id);

    const data = await getEmployees();
    setEmployees(data);
  }

  return (
    <div className="page-grid">
      <EmployeeForm
        editingEmployee={editingEmployee}
        onSaveEmployee={saveEmployee}
        onCancelEdit={() => setEditingEmployee(null)}
      />

      <EmployeeTable
        employees={employees}
        onEditEmployee={setEditingEmployee}
        onRemoveEmployee={removeEmployee}
      />
    </div>
  );
}