import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../src/pages/home/home';



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
