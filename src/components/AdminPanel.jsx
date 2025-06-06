import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthProvider';

export default function AdminPanel() {
  const { profile } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (profile?.role === 'admin') {
      loadUsers();
    }
  }, [profile]);

  const loadUsers = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at');
    setUsers(data || []);
  };

  const approveUser = async (id) => {
    await supabase.from('profiles').update({ approved: true }).eq('id', id);
    loadUsers();
  };

  return profile?.role === 'admin' ? (
    <div className="p-4 max-w-xl mx-auto mt-4 bg-yellow-50 border rounded">
      <h3 className="font-bold mb-2">🔑 AdminPanel: Benutzer freischalten</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id} className="flex justify-between items-center border-b py-1 text-sm">
            <span>{u.email || u.id.slice(0, 6)}</span>
            <span>
              {u.approved ? '✅ freigegeben' : (
                <button className="bg-green-500 text-white px-2 rounded" onClick={() => approveUser(u.id)}>
                  Freigeben
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}