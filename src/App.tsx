import './App.css'
import { useEffect, useState } from 'react';
import ServerList from './components/ServerList';
import Header from './components/Header/Header.tsx';

function App() {
type Service = {
  name: string;
  description: string;
  active_state: string;
};

type ServerStatus = {
  message: string;
  services: Service[];
};

const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
const API_URL = import.meta.env.VITE_API_URL;

const fetchServerStatus = async () => {
  if (!API_URL) {
    console.error('VITE_API_URL is not set in your environment variables.');
    return;
  }
  try {
    const response = await fetch(`${API_URL}/`);
    if (response.ok) {
      const data = await response.json();
      // Validate data shape before setting state
      if (
        typeof data === 'object' &&
        data !== null &&
        typeof data.message === 'string' &&
        Array.isArray(data.services)
      ) {
        setServerStatus(data);
      } else {
        console.error('Invalid server status response:', data);
        setServerStatus(null);
      }
    } else {
      console.error('Server responded with status:', response.status);
      setServerStatus(null);
    }
  } catch (error) {
    console.error('Failed to fetch server status:', error);
    setServerStatus(null);
  }
};

useEffect(() => {
  fetchServerStatus();
  const interval = setInterval(fetchServerStatus, 5000);
  return () => clearInterval(interval);
}, []);

  return (
    
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        {serverStatus ? (
          <ServerList services={serverStatus.services} API_URL={API_URL} />
        ) : (
          <p style={{ color: '#999' }}>Loading server status...</p>
        )}
      </main>
    </>
  )
}

export default App
