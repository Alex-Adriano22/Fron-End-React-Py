import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../src/pages/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />


       

      </Routes>
    </BrowserRouter>

  );
}

export default App;
