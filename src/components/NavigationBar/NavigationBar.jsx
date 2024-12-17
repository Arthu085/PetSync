import { useState } from 'react';
import { Link } from 'react-router-dom';
import hamburguer from '../../assets/hamburguer.svg';
import './NavigationBar.css';
import SideBar from '../SideBar/SideBar';
import logout from '../../assets/logout-svgrepo-com.svg'

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
        <div className='buttons'>
          <button
            className="hamburguer-button"
            id="toggle-sidebar"
            onClick={toggleSidebar}
          >
            <img src={hamburguer} alt="Menu" />
          </button>
          <Link to='/'>
            <button className='logout-button' id='logout-button'>
              <img src={logout} alt="Saída" />
            </button>
          </Link>
        </div>
      </header>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default NavigationBar;
