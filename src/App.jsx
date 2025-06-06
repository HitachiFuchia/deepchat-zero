import LoginForm from './components/LoginForm';
import ChatRoom from './components/ChatRoom';
import AdminPanel from './components/AdminPanel';
import Gatekeeper from './components/Gatekeeper';

function App() {
  return (
    <div className="min-h-screen bg-neutral-100 text-gray-800">
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">🧠 deepchat-zero</h1>

        {/* Login immer sichtbar */}
        <LoginForm />

        {/* Nur sichtbar bei eingeloggten + freigegebenen Usern */}
        <Gatekeeper>
          <ChatRoom />
          <AdminPanel />
        </Gatekeeper>
      </div>
    </div>
  );
}

export default App;