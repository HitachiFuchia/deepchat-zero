import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    if (!email || !password) return alert('Bitte E-Mail und Passwort angeben');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert('Login fehlgeschlagen: ' + error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert('Registrierung fehlgeschlagen: ' + error.message);
      else alert('Registrierung erfolgreich – warte auf Freigabe durch Admin');
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-2">
        <input
          type="email"
          placeholder="Email"
          className="border px-2 py-1 rounded flex-1"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          className="border px-2 py-1 rounded flex-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black text-white px-4 rounded" onClick={handleSubmit}>
          {isLogin ? 'Login' : 'SignUp'}
        </button>
      </div>

      <p className="text-sm text-gray-600">
        {isLogin ? 'Noch keinen Account?' : 'Schon registriert?'}{' '}
        <button className="underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Registrieren' : 'Einloggen'}
        </button>
      </p>
    </div>
  );
}