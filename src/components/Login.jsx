import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { COMPANY_INFO } from "../data/initialData";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
  e.preventDefault();
  setError("");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    return;
  }

  const user = data.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
  console.log("PROFILE ERROR:", profileError);
  console.log("AUTH USER:", user);

  setError(
    profileError?.message ||
    profileError?.details ||
    profileError?.hint ||
    "Profil bulunamadı"
  );
  return;
}

  onLogin({
    id: user.id,
    email: user.email,
    name: profile.full_name,
    role: profile.role,
    employee_id: profile.employee_id,
  });
}

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div className="brand-mark">FG</div>
        <h1>{COMPANY_INFO.name}</h1>

        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Şifre
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <div className="error-box">{error}</div>}

        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}