import { useState } from 'react';
import { COMPANY_INFO, USERS } from '../data/initialData';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const user = USERS.find((item) => item.username === username && item.password === password);
    if (!user) {
      setError('Kullanıcı adı veya şifre hatalı.');
      return;
    }
    onLogin(user);
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div className="brand-mark">FG</div>
        <h1>{COMPANY_INFO.name}</h1>
        <p>İşçi takip, puantaj, mesai ve maaş bordro sistemi</p>
        <label>Kullanıcı Adı<input value={username} onChange={(e) => setUsername(e.target.value)} /></label>
        <label>Şifre<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <div className="error-box">{error}</div>}
        <button type="submit">Giriş Yap</button>
        <small>Demo: admin / admin123 veya personel / 1234</small>
      </form>
    </div>
  );
}
