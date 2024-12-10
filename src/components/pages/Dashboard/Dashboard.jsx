import './Dashboard.css';
import NavigationBar from '../../NavigationBar/NavigationBar';


const Dashboard = () => {
  return (
    <div>
        <NavigationBar/>
        <h1 className='bem-vindo'>Bem Vindo <br/>ao <br/>PetSync!</h1>
    </div>
  )
}

export default Dashboard