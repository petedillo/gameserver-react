import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/controller.svg"
            alt="Game Server Logo"
            className="logo-glow"
          />
          <h1 className="server-title neon-text">
            Game Server
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
