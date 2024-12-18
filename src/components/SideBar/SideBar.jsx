import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ isOpen, toggleSidebar }) => {

  const accessType = Number(localStorage.getItem('accessType')); 

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
            {accessType === 1 && (
          <li><Link to="/usuario" className='link-sidebar' onClick={toggleSidebar}>Usuários</Link></li> 
            )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
