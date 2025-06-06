import { useAuth } from '../context/AuthProvider';

export default function Gatekeeper({ children }) {
  const auth = useAuth();

  if (!auth) {
    return <p>⏳ Auth-Kontext initialisiert nicht</p>;
  }

  const { session, profile } = auth;

  if (!session) return <p>🔐 Bitte einloggen</p>;
  if (!profile?.approved) return <p>⏳ Zugang noch nicht freigegeben</p>;

  return children;
}