import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { Detail, Form, Home, Landing } from './views';
import Navbar from './components/Navbar/Navbar';

function App() {
  const location = useLocation().pathname;

  return (
    <div>
      {location !== '/' && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </div>
  )
}

export default App
