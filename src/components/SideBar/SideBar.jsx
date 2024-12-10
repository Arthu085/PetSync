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
                Adicionar Cliente
              </Link>
            </li>
            <li>
              <Link to='#' className='link-sidebar' onClick={toggleSidebar}>
                Adicionar Animal
              </Link>
            </li>
            <li>
              <Link to='#' className='link-sidebar' onClick={toggleSidebar}>
                Adicionar Usuário
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
