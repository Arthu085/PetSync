import { Link } from 'react-router-dom';
import hamburguer from '../../assets/hamburguer.svg'
import './NavigationBar.css'

const NavigationBar = () => {
  return (
    <div>
        <header>
        <Link className='link-dashboard' to="/dashboard">Dashboard</Link>
        <button className='hamburguer-button'><img src={hamburguer}/></button>
        </header>
    </div>
  )
}

export default NavigationBar