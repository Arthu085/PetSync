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
              <a href="#section1" id="link-cliente" onClick={toggleSidebar}>
                Adicionar Cliente
              </a>
            </li>
            <li>
              <a href="#section2" id="link-animal" onClick={toggleSidebar}>
                Adicionar Animal
              </a>
            </li>
            <li>
              <a href="#section3" id="link-usuario" onClick={toggleSidebar}>
                Adicionar Usuário
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
