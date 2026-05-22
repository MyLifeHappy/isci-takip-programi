import { useEffect, useState } from 'react';
import { toNumber } from '../utils/formatUtils';

const EMPTY_FORM = { name: '', identityNo: '', department: '', jobTitle: '', startDate: '', legalSalary: '', cashSalary: '' };

export default function EmployeeForm({ editingEmployee, onSaveEmployee, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (editingEmployee) setForm(editingEmployee);
    else setForm(EMPTY_FORM);
  }, [editingEmployee]);

  function updateField(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  function submitForm(event) {
    event.preventDefault();
    if (!form.name.trim()) return;
    onSaveEmployee({
      ...form,
      ...(editingEmployee?.id ? { id: editingEmployee.id } : {}),
      legalSalary: toNumber(form.legalSalary),
      cashSalary: toNumber(form.cashSalary),
      active: true,
    });
    if (!editingEmployee) setForm(EMPTY_FORM);
  }

  return (
    <form className="card form-grid" onSubmit={submitForm}>
      <div className="section-title"><h2>{editingEmployee ? 'İşçi Düzenle' : 'Yeni İşçi Ekle'}</h2><p>Legal maaş ve ek ödeme ayrı takip edilir.</p></div>
      <label>Ad Soyad<input value={form.name} onChange={(e) => updateField('name', e.target.value)} /></label>
      <label>T.C. / Kimlik No<input value={form.identityNo || ''} onChange={(e) => updateField('identityNo', e.target.value)} /></label>
      <label>Bölüm<input value={form.department || ''} onChange={(e) => updateField('department', e.target.value)} /></label>
      <label>Görev<input value={form.jobTitle || ''} onChange={(e) => updateField('jobTitle', e.target.value)} /></label>
      <label>İşe Giriş<input type="date" value={form.startDate || ''} onChange={(e) => updateField('startDate', e.target.value)} /></label>
      <label>Legal Maaş<input type="number" value={form.legalSalary} onChange={(e) => updateField('legalSalary', e.target.value)} /></label>
      <label>Elden / Ek Maaş<input type="number" value={form.cashSalary} onChange={(e) => updateField('cashSalary', e.target.value)} /></label>
      <div className="form-actions"><button type="submit">{editingEmployee ? 'Güncelle' : 'İşçi Ekle'}</button>{editingEmployee && <button type="button" className="secondary" onClick={onCancelEdit}>Vazgeç</button>}</div>
    </form>
  );
}
