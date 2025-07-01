import { useEffect } from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { GlassCard, Button } from './theme/styled';
import ServerStatus from './components/ServerStatus';
import './App.css';

function App() {
  // Set up global error handler
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      // You could integrate with an error tracking service here
    };

    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <header style={{
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 247, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ 
              margin: 0,
              background: 'linear-gradient(90deg, #00f7ff, #9c27b0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 10px rgba(0, 247, 255, 0.3)'
            }}>
              Game Server Dashboard
            </h1>
          </div>
          <div>
            <Button 
              as="a" 
              href="https://github.com/petedillo/gameserver-react" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ marginRight: '0.5rem' }}
            >
              GitHub
            </Button>
            <Button 
              variant="secondary" 
              as="a" 
              href="https://discord.gg/yourinvite" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Join Discord
            </Button>
          </div>
        </header>

        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <ServerStatus />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <GlassCard>
              <h2>Server Resources</h2>
              <p>CPU: <span className="neon-text">42%</span></p>
              <p>Memory: <span className="neon-text">3.2GB / 8GB</span></p>
              <p>Uptime: <span className="neon-text">2d 14h 23m</span></p>
            </GlassCard>
            
            <GlassCard>
              <h2>Quick Actions</h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button>Backup Now</Button>
                <Button variant="secondary">Update Server</Button>
                <Button>Restart</Button>
              </div>
            </GlassCard>
          </div>
          
          <GlassCard style={{ marginTop: '2rem' }}>
            <h2>Server Console</h2>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '6px',
              padding: '1rem',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.9rem',
              height: '300px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              marginBottom: '1rem'
            }}>
              [INFO] Server started successfully
              [INFO] Loading world...
              [INFO] World loaded in 4.2s
              [PLAYER] Player1 joined the game
              [CHAT] Player1: Hello everyone!
              [PLAYER] Player2 joined the game
            </div>
            <div style={{ display: 'flex' }}>
              <input 
                type="text" 
                placeholder="Enter command..." 
                style={{
                  flex: 1,
                  marginRight: '0.5rem',
                  padding: '0.75rem',
                  background: 'rgba(25, 25, 45, 0.5)',
                  border: '1px solid rgba(0, 247, 255, 0.3)',
                  borderRadius: '6px',
                  color: '#e0e0e0',
                  fontFamily: '"Fira Code", monospace'
                }}
              />
              <Button>Send</Button>
            </div>
          </GlassCard>
        </main>
        
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#a0a0a0',
          fontSize: '0.9rem',
          borderTop: '1px solid rgba(0, 247, 255, 0.1)'
        }}>
          <p>Game Server Dashboard &copy; {new Date().getFullYear()} | Made with ❤️ by PeteDillo</p>
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Version {import.meta.env.VITE_APP_VERSION || '1.0.0'}</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
