import { COMPANY_INFO } from '../data/initialData';
import { formatMoney } from '../utils/formatUtils';
import { getMonthLabel } from '../utils/dateUtils';

export default function PayrollSlip({ payroll, selectedMonth, settings }) {
  if (!payroll) return <div className="card empty-state">Bordro için işçi seçiniz.</div>;

  return (
    <div className="card payroll-slip">
      <div className="slip-actions"><button onClick={() => window.print()}>Bordroyu Yazdır / PDF Kaydet</button></div>
      <div className="bordro-paper">
        <header className="bordro-header">
          <div className="brand-mark dark">FG</div>
          <div>
            <h1>{COMPANY_INFO.name}</h1>
            <p>{COMPANY_INFO.address}</p>
            <p>Vergi Dairesi: {COMPANY_INFO.taxOffice || '-'} | Vergi No: {COMPANY_INFO.taxNumber || '-'}</p>
            <p>Telefon: {COMPANY_INFO.phone || '-'} | E-posta: {COMPANY_INFO.email || '-'}</p>
          </div>
          <div className="period-box"><strong>MAAŞ BORDROSU</strong><span>{getMonthLabel(selectedMonth)}</span></div>
        </header>

        <section className="bordro-grid">
          <div>
            <h3>Personel Bilgileri</h3>
            <p><b>Ad Soyad:</b> {payroll.employee.name}</p>
            <p><b>Kimlik No:</b> {payroll.employee.identityNo || '-'}</p>
            <p><b>Bölüm:</b> {payroll.employee.department || '-'}</p>
            <p><b>Görev:</b> {payroll.employee.jobTitle || '-'}</p>
            <p><b>İşe Giriş:</b> {payroll.employee.startDate || '-'}</p>
          </div>
          <div>
            <h3>Dönem / Çalışma Bilgileri</h3>
            <p><b>Bordro Dönemi:</b> {getMonthLabel(selectedMonth)}</p>
            <p><b>Hesaplama Başlangıcı:</b> {payroll.payrollStartDate || '-'}</p>
            <p><b>Normal Çalışma:</b> {settings.startTime} - {settings.endTime}</p>
            <p><b>Günlük Net Saat:</b> {settings.normalDailyHours}</p>
            <p><b>Ay Çalışma Günü:</b> {payroll.monthWorkDays}</p>
            <p><b>Personel Hak Ediş Günü:</b> {payroll.employeeWorkDays}</p>
            <p><b>Mesai Çarpanı:</b> x{settings.overtimeMultiplier}</p>
          </div>
        </section>

        <table className="bordro-table">
          <thead>
            <tr><th>Açıklama</th><th>Gün/Saat</th><th>Tutar</th><th>Not</th></tr>
          </thead>
          <tbody>
            <tr><td>Brüt / Normal Legal Maaş</td><td>{payroll.employeeWorkDays} gün</td><td>{formatMoney(payroll.legalSalary)}</td><td>Tam maaş: {formatMoney(payroll.fullLegalSalary)}</td></tr>
            <tr><td>Elden / Ek Maaş</td><td>{payroll.employeeWorkDays} gün</td><td>{formatMoney(payroll.cashSalary)}</td><td>Tam ek ödeme: {formatMoney(payroll.fullCashSalary)}</td></tr>
            <tr><td>Toplam Hesaplanan Maaş</td><td>{payroll.employeeNormalHours} saat</td><td>{formatMoney(payroll.totalSalary)}</td><td>Saatlik: {formatMoney(payroll.hourlyRate)}</td></tr>
            <tr><td>Devamsızlık Kesintisi</td><td>{payroll.totalAbsentHours} saat</td><td>- {formatMoney(payroll.absenceDeduction)}</td><td>Gelmediği saat/gün düşülür</td></tr>
            <tr><td>Fazla Mesai Ödemesi</td><td>{payroll.totalOvertimeHours} saat</td><td>+ {formatMoney(payroll.overtimePayment)}</td><td>x{settings.overtimeMultiplier} çarpan</td></tr>
          </tbody>
        </table>

        <section className="net-pay-box">
          <div><span>Ödenecek Legal</span><strong>{formatMoney(payroll.payableLegal)}</strong></div>
          <div><span>Ödenecek Elden / Ek</span><strong>{formatMoney(payroll.payableCash)}</strong></div>
          <div className="grand"><span>Net Ödenecek Toplam</span><strong>{formatMoney(payroll.payableTotal)}</strong></div>
        </section>

        <div className="bordro-detail-row">
          <div><b>Toplam Kesinti:</b> {formatMoney(payroll.absenceDeduction)}</div>
          <div><b>Toplam Mesai:</b> {formatMoney(payroll.overtimePayment)}</div>
          <div><b>Hak Ediş Oranı:</b> %{(payroll.prorateRatio * 100).toFixed(2)}</div>
        </div>

        <p className="bordro-note">Not: Bu uygulama iç takip amacıyla hazırlanmıştır. Resmi bordro, SGK ve gelir vergisi hesapları için mali müşavir kontrolü gerekir.</p>
        <footer className="signature-area"><span>İşveren / Yetkili İmza</span><span>Personel İmza</span></footer>
      </div>
    </div>
  );
}
