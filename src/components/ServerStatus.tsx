import { useState, useEffect } from 'react';
import { GlassCard, Button } from '../theme/styled';
import { useApi } from '../hooks/useApi';

type ServerStatus = 'online' | 'offline' | 'starting' | 'stopping';

interface Player {
  name: string;
  level: number;
  playTime: string;
}

interface ServerStatusData {
  status: ServerStatus;
  players: Player[];
  playerCount: number;
  maxPlayers: number;
  version: string;
  name: string;
  map: string;
  gameType: string;
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
  lastUpdated: string;
}

export default function ServerStatus() {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [starting, setStarting] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [restarting, setRestarting] = useState(false);
  
  // Use the useApi hook to fetch server status
  const { data: serverStatus, error, loading, execute: fetchStatus } = useApi<ServerStatusData>('/api/status');

  // Refresh status every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus();
    }, 30000);

    // Initial fetch
    fetchStatus();

    return () => clearInterval(interval);
  }, [fetchStatus]);

  // Update last updated time
  useEffect(() => {
    if (serverStatus) {
      setLastUpdated(new Date().toLocaleTimeString());
    }
  }, [serverStatus]);

  const handleServerAction = async (action: 'start' | 'stop' | 'restart'): Promise<void> => {
    try {
      if (action === 'start') setStarting(true);
      else if (action === 'stop') setStopping(true);
      else if (action === 'restart') setRestarting(true);
      
      const response = await fetch(`/api/server/${action}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${action} server`);
      }
      
      // Refresh status after a short delay
      setTimeout(fetchStatus, 2000);
    } catch (err) {
      console.error(`Failed to ${action} server:`, err);
    } finally {
      setStarting(false);
      setStopping(false);
      setRestarting(false);
    }
  };

  if (error) {
    return (
      <GlassCard>
        <h2>Server Status</h2>
        <p>Error loading server status: {error}</p>
        <Button onClick={() => fetchStatus()}>Retry</Button>
      </GlassCard>
    );
  }

  const isLoading = loading || starting || stopping || restarting;
  const isOnline = serverStatus?.status === 'online';
  const isOffline = !serverStatus || serverStatus.status === 'offline';

  return (
    <GlassCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Server Status</h2>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          {lastUpdated && `Last updated: ${lastUpdated}`}
          <Button 
            onClick={() => fetchStatus()} 
            disabled={isLoading}
            style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
            variant="secondary"
          >
            Refresh
          </Button>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            <span style={{ opacity: 0.8 }}>Status:</span>{' '}
            <span style={{
              color: isOnline ? '#4caf50' : '#f44336',
              fontWeight: 500,
              textTransform: 'capitalize'
            }}>
              {serverStatus?.status || 'Unknown'}
            </span>
          </p>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            <span style={{ opacity: 0.8 }}>Players:</span>{' '}
            <span style={{ fontWeight: 500 }}>
              {serverStatus?.playerCount || 0} / {serverStatus?.maxPlayers || 0}
            </span>
          </p>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            <span style={{ opacity: 0.8 }}>Version:</span>{' '}
            <span style={{ fontWeight: 500 }}>{serverStatus?.version || 'Unknown'}</span>
          </p>
        </div>
        <div>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            <span style={{ opacity: 0.8 }}>Map:</span>{' '}
            <span style={{ fontWeight: 500 }}>{serverStatus?.map || 'Unknown'}</span>
          </p>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            <span style={{ opacity: 0.8 }}>Uptime:</span>{' '}
            <span style={{ fontWeight: 500 }}>{serverStatus?.uptime || 'N/A'}</span>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button 
          onClick={() => void handleServerAction('start')} 
          disabled={isLoading || !isOffline}
          variant="success"
        >
          {starting ? 'Starting...' : 'Start Server'}
        </Button>
        
        <Button 
          onClick={() => void handleServerAction('stop')} 
          disabled={isLoading || isOffline}
          variant="danger"
        >
          {stopping ? 'Stopping...' : 'Stop Server'}
        </Button>
        
        <Button 
          onClick={() => void handleServerAction('restart')} 
          disabled={isLoading || isOffline}
          variant="warning"
        >
          {restarting ? 'Restarting...' : 'Restart Server'}
        </Button>
      </div>

      {serverStatus?.players && serverStatus.players.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>Online Players</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.5rem'
          }}>
            {serverStatus.players.map((player: Player, index: number) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                <div style={{ fontWeight: 500 }}>{player.name}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  Level {player.level} • {player.playTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
};
