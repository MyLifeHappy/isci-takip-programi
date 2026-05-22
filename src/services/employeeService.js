import { supabase } from "../lib/supabaseClient";

function fromDb(row) {
  return {
    id: row.id,
    name: row.name,
    department: row.department,
    title: row.title,
    identityNo: row.identity_no,
    startDate: row.start_date,
    legalSalary: Number(row.legal_salary || 0),
    cashSalary: Number(row.cash_salary || 0),
    active: row.active,
  };
}

function toDb(employee) {
  return {
    name: employee.name,
    department: employee.department,
    title: employee.jobTitle || employee.title,
    identity_no: employee.identityNo,
    start_date: employee.startDate,
    legal_salary: Number(employee.legalSalary || 0),
    cash_salary: Number(employee.cashSalary || 0),
    active: employee.active ?? true,
  };
}

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("active", true)
    .order("id", { ascending: true });

  if (error) throw error;
  return data.map(fromDb);
}

export async function addEmployee(employee) {
  const { data, error } = await supabase
    .from("employees")
    .insert([toDb(employee)])
    .select();

  console.log("INSERT RESULT:", data);
  console.log("INSERT ERROR:", error);

  if (error) throw error;
  return data.map(fromDb);
}

export async function updateEmployee(id, employee) {
  const { data, error } = await supabase
    .from("employees")
    .update(toDb(employee))
    .eq("id", id)
    .select();

  if (error) throw error;
  return data.map(fromDb);
}

export async function deleteEmployee(id) {
  const { error } = await supabase
    .from("employees")
    .update({ active: false })
    .eq("id", id);

  if (error) throw error;
}