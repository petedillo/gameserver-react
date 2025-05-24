import { useState } from 'react';

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
      
      const data = await response.json();
      alert(`${action} command sent to ${serviceName}: ${data.message}`);
    } catch (error) {
      console.error(`Error ${action}ing service:`, error);
      alert(`Failed to ${action} ${serviceName}`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="server-item p-4 border rounded mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold">{service.name}</h2>
      <p className="text-gray-600">{service.description}</p>
      <p className={`status ${service.active_state === 'active' ? 'text-green-500' : 'text-red-500'} font-semibold`}>
        Status: {service.active_state}
      </p>
      <div className="button-group mt-2 space-x-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          onClick={() => handleServiceAction(service.name, 'start')}
          disabled={loading !== null}
        >
          Start
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          onClick={() => handleServiceAction(service.name, 'stop')}
          disabled={loading !== null}
        >
          Stop
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          onClick={() => handleServiceAction(service.name, 'restart')}
          disabled={loading !== null}
        >
          Restart
        </button>
      </div>
      {loading && (
        <p className="text-gray-500 mt-2">{loading}...</p>
      )}
    </div>
  );
};

export default ServerCard;