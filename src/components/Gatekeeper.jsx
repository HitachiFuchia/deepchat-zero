import { useAuth } from '../context/AuthProvider';

export default function Gatekeeper({ children }) {
  const { session, profile } = useAuth();

  if (!session) return <p>🔐 Bitte einloggen</p>;
  if (!profile?.approved) return <p>⏳ Zugang noch nicht freigeschaltet</p>;

  return children;
}
