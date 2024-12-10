import { useState } from 'react';
import { Link } from 'react-router-dom';
import hamburguer from '../../assets/hamburguer.svg';
import './NavigationBar.css';
import SideBar from '../SideBar/SideBar'; // Importa a SideBar

const NavigationBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <header className="navbar">
        <Link className="link-dashboard" to="/dashboard">
          Dashboard
        </Link>
        <button
          className="hamburguer-button"
          id="toggle-sidebar"
          onClick={toggleSidebar}
        >
          <img src={hamburguer} alt="Menu" />
        </button>
      </header>
      {/* Passa o estado e a função para a SideBar */}
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default NavigationBar;
