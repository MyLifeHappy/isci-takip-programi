import { useEffect, useState } from 'react';
import { toNumber } from '../utils/formatUtils';

export default function AttendanceForm({ employees, settings, onAddAttendance, currentUser }) {
  const firstEmployeeId = employees.find((e) => e.active)?.id || '';
  const [form, setForm] = useState({ employeeId: firstEmployeeId, date: new Date().toISOString().slice(0, 10), status: 'Geldi', workedHours: settings.normalDailyHours, absentHours: 0, overtimeHours: 0, note: '' });

  useEffect(() => {
    if (!form.employeeId && firstEmployeeId) setForm((prev) => ({ ...prev, employeeId: firstEmployeeId }));
  }, [firstEmployeeId, form.employeeId]);

  function updateField(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'status' && value === 'Gelmedi') { next.workedHours = 0; next.absentHours = settings.normalDailyHours; next.overtimeHours = 0; }
      if (field === 'status' && value === 'Yarım Gün') { next.workedHours = settings.normalDailyHours / 2; next.absentHours = settings.normalDailyHours / 2; next.overtimeHours = 0; }
      if (field === 'status' && value === 'Geldi') { next.workedHours = settings.normalDailyHours; next.absentHours = 0; }
      return next;
    });
  }

  function submitForm(event) {
    event.preventDefault();
    if (!form.employeeId || !form.date) return;
    onAddAttendance({ id: Date.now(), employeeId: Number(form.employeeId), date: form.date, status: form.status, workedHours: toNumber(form.workedHours), absentHours: toNumber(form.absentHours), overtimeHours: toNumber(form.overtimeHours), note: form.note, createdBy: currentUser.username });
  }

  return (
    <form className="card form-grid" onSubmit={submitForm}>
      <div className="section-title"><h2>Puantaj / Devamsızlık / Mesai</h2><p>{currentUser.role === 'admin' ? 'Admin mesai ve kesinti girebilir.' : 'Vardiya amiri tüm işçiler için puantaj, devamsızlık ve mesai girebilir.'}</p></div>
      <label>
  İşçi
  <select
    value={form.employeeId}
    onChange={(e) => updateField('employeeId', e.target.value)}
    
  >
    {employees
      .filter((e) => e.active)
      .map((e) => (
        <option key={e.id} value={e.id}>
          {e.name}
        </option>
      ))}
  </select>
</label>
      <label>Tarih<input type="date" value={form.date} onChange={(e) => updateField('date', e.target.value)} /></label>
      <label>Durum<select value={form.status} onChange={(e) => updateField('status', e.target.value)}><option>Geldi</option><option>Gelmedi</option><option>Yarım Gün</option><option>İzinli</option><option>Raporlu</option></select></label>
      <label>Çalışılan Saat<input type="number" step="0.5" value={form.workedHours} onChange={(e) => updateField('workedHours', e.target.value)} /></label>
      <label>Kesilecek Saat<input type="number" step="0.5" value={form.absentHours} onChange={(e) => updateField('absentHours', e.target.value)} /></label>
      <label>
  Mesai Saati
  <input
    type="number"
    step="0.5"
    value={form.overtimeHours}
    onChange={(e) => updateField('overtimeHours', e.target.value)}
  />
</label>
      <label className="full">Not<input value={form.note} onChange={(e) => updateField('note', e.target.value)} placeholder="Örn: 2 saat geç geldi / raporlu" /></label>
      <button type="submit">Kaydı Ekle</button>
    </form>
  );
}
