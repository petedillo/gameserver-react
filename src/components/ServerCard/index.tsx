import { useState } from 'react';
import './ServerCard.css';

type Service = {
  name: string;
  description: string;
  active_state: string;
};

type ServerCardProps = {
  service: Service;
  API_URL: string;
};

const ServerCard = ({ service, API_URL }: ServerCardProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleServiceAction = async (serviceName: string, action: 'start' | 'stop' | 'restart') => {
    setLoading(`${action}ing ${serviceName}`);
    try {
      const response = await fetch(`${API_URL}/${serviceName.toLowerCase()}/${action}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${action} service`);
      }
      await response.json();
    } catch (error) {
      console.error(`Error ${action}ing service:`, error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className={`server-card ${service.active_state === 'active' ? 'server-active' : 'server-inactive'}`}>
      <div className="server-card-content">
        <h3 className="server-name">{service.name}</h3>
        <p className="server-description">{service.description}</p>
        <div className="server-status">
          <span className="status-indicator"></span>
          <span className="status-text">{service.active_state}</span>
        </div>
      </div>
      
      <div className="server-actions">
        <button
          className="action-button start-button"
          onClick={() => handleServiceAction(service.name, 'start')}
          disabled={loading !== null}
        >
          Start
        </button>
        <button
          className="action-button stop-button"
          onClick={() => handleServiceAction(service.name, 'stop')}
          disabled={loading !== null}
        >
          Stop
        </button>
        <button
          className="action-button restart-button"
          onClick={() => handleServiceAction(service.name, 'restart')}
          disabled={loading !== null}
        >
          Restart
        </button>
      </div>
      
      {loading && (
        <div className="loading-indicator">
          <p>{loading}...</p>
        </div>
      )}
    </div>
  );
};

export default ServerCard;
