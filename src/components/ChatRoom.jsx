import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthProvider';

export default function ChatRoom() {
  const { session, profile } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel('chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    await supabase.from('messages').insert({
      user_id: session.user.id,
      content: text,
    });
    setText('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2">💬 Live Chat</h2>
      <div className="bg-white rounded shadow p-3 h-64 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm mb-1">
            <span className="font-semibold">{msg.user_id.slice(0, 6)}:</span> {msg.content}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          className="border flex-1 p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nachricht schreiben..."
        />
        <button className="bg-blue-600 text-white px-4 rounded" onClick={sendMessage}>
          Senden
        </button>
      </div>
    </div>
  );
}
