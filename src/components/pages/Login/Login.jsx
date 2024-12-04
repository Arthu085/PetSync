import './Login.css'

const Login = () => {
  return (
    <div className='login-container'>
        <h2>Bem-vindo</h2>
        <form action="login">
            <label htmlFor="email">Digite seu E-mail:</label>
            <input type="email" placeholder="seuemail@exemplo.com" />
            <label htmlFor="password">Digite sua senha:</label>
            <input type="password" placeholder="********" />
            <button>Entrar</button>
        </form>
    </div>
  )
}

export default Login