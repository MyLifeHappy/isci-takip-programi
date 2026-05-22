import { COMPANY_INFO } from '../data/initialData';
import { calculateWorkDaysForMonth } from '../utils/dateUtils';

export default function SettingsPage({ settings, setSettings, calendarOverrides, setCalendarOverrides }) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  function updateSetting(field, value) { setSettings((prev) => ({ ...prev, [field]: Number(value) || value })); }
  function addOverride(type) { setCalendarOverrides((prev) => [{ id: Date.now(), date: new Date().toISOString().slice(0, 10), type, note: '' }, ...prev]); }
  function updateOverride(id, field, value) { setCalendarOverrides((prev) => prev.map((item) => item.id === id ? { ...item, [field]: value } : item)); }
  function deleteOverride(id) { setCalendarOverrides((prev) => prev.filter((item) => item.id !== id)); }

  return (
    <div className="page-grid">
      <div className="card company-card"><div className="brand-mark dark">FG</div><div><h2>{COMPANY_INFO.name}</h2><p>{COMPANY_INFO.title}</p><p>{COMPANY_INFO.address}</p></div></div>
      <div className="card form-grid">
        <div className="section-title"><h2>Çalışma Ayarları</h2><p>Hafta içi otomatik çalışma günü kabul edilir. Bayram/tatil veya ekstra çalışma gününü aşağıdan ekleyebilirsin.</p></div>
        <label>İş Başı<input type="time" value={settings.startTime} onChange={(e) => updateSetting('startTime', e.target.value)} /></label>
        <label>İş Bitiş<input type="time" value={settings.endTime} onChange={(e) => updateSetting('endTime', e.target.value)} /></label>
        <label>Yemek Molası<input type="number" step="0.5" value={settings.lunchBreakHours} onChange={(e) => updateSetting('lunchBreakHours', e.target.value)} /></label>
        <label>Günlük Normal Saat<input type="number" step="0.5" value={settings.normalDailyHours} onChange={(e) => updateSetting('normalDailyHours', e.target.value)} /></label>
        <label>Mesai Çarpanı<input type="number" step="0.25" value={settings.overtimeMultiplier} onChange={(e) => updateSetting('overtimeMultiplier', e.target.value)} /></label>
        <div className="info-chip">Bu ay otomatik çalışma günü: <strong>{calculateWorkDaysForMonth(currentMonth, calendarOverrides)}</strong></div>
      </div>

      <div className="card table-card">
        <div className="section-title"><h2>Tatil / Ek Çalışma Günleri</h2><p>Bayram gününü tatil, cumartesi/pazar çalışmasını ek çalışma günü olarak işaretleyebilirsin.</p></div>
        <div className="form-actions"><button onClick={() => addOverride('holiday')}>Tatil Günü Ekle</button><button className="secondary" onClick={() => addOverride('workday')}>Ek Çalışma Günü Ekle</button></div>
        <table><thead><tr><th>Tarih</th><th>Tip</th><th>Not</th><th>İşlem</th></tr></thead><tbody>{calendarOverrides.map((item) => <tr key={item.id}><td><input type="date" value={item.date} onChange={(e) => updateOverride(item.id, 'date', e.target.value)} /></td><td><select value={item.type} onChange={(e) => updateOverride(item.id, 'type', e.target.value)}><option value="holiday">Tatil / Bayram</option><option value="workday">Ek Çalışma Günü</option></select></td><td><input value={item.note} onChange={(e) => updateOverride(item.id, 'note', e.target.value)} placeholder="Örn: Ramazan Bayramı" /></td><td><button className="danger" onClick={() => deleteOverride(item.id)}>Sil</button></td></tr>)}</tbody></table>
      </div>
    </div>
  );
}
