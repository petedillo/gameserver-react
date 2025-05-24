import ServerCard from './ServerCard';

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
      {services.map((service) => (
        <ServerCard 
          key={service.name} 
          service={service} 
          API_URL={API_URL}
        />
      ))}
    </div>
  );
};

export default ServerList;