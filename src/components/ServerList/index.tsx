import './ServerList.css';
import ServerCard from '../ServerCard';

type Service = {
  name: string;
  description: string;
  active_state: string;
};

type ServerListProps = {
  services: Service[];
  API_URL: string;
};

const ServerList = ({ services, API_URL }: ServerListProps) => {
  return (
    <div className="server-list">
      <h2 className="server-list-title neon-text">Available Services</h2>
      <div className="server-list-grid">
        {services.map((service) => (
          <ServerCard 
            key={service.name} 
            service={service} 
            API_URL={API_URL}
          />
        ))}
      </div>
    </div>
  );
};

export default ServerList;
