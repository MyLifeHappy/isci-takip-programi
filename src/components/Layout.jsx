import { COMPANY_INFO } from '../data/initialData';

export default function Layout({ currentPage, setCurrentPage, currentUser, onLogout, children }) {
  const adminItems = [
    { key: 'dashboard', label: 'Özet' },
    { key: 'employees', label: 'İşçiler' },
    { key: 'attendance', label: 'Puantaj' },
    { key: 'payroll', label: 'Maaş Hesaplama' },
    { key: 'settings', label: 'Ayarlar' },
  ];
  const staffItems = [{ key: 'attendance', label: 'Devamsızlık Girişi' }];
  const menuItems = currentUser.role === 'admin' ? adminItems : staffItems;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand"><div className="brand-mark">FG</div><div><h1>{COMPANY_INFO.name}</h1><p>Bordro Sistemi</p></div></div>
        <nav>{menuItems.map((item) => <button key={item.key} className={currentPage === item.key ? 'active' : ''} onClick={() => setCurrentPage(item.key)}>{item.label}</button>)}</nav>
        <div className="user-box"><strong>{currentUser.name}</strong><span>{currentUser.role === 'admin' ? 'Admin' : 'Personel'}</span><button className="ghost" onClick={onLogout}>Çıkış</button></div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
