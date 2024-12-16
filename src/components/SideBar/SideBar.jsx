import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay para fechar ao clicar fora */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      <div className={`sidebar sidebar-right ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <Link to='/cliente' className='link-sidebar' onClick={toggleSidebar}>
                Cliente
              </Link>
            </li>
            <li>
              <Link to='/animal' className='link-sidebar' onClick={toggleSidebar}>
                Animal
              </Link>
            </li>
            <li>
              <Link to='/usuario' className='link-sidebar' onClick={toggleSidebar}>
                Usuário
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
