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
    <div className="server-list grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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