import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
