import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import C from './pages/C.jsx'
import Cplus from './pages/Cplus.jsx';
import Java from './pages/Java.jsx';
import Python from './pages/Python.jsx';
import Web from './pages/Web.jsx';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/quiz/c" element={<C/>}></Route>
          <Route path="/quiz/cpp" element={<Cplus/>}></Route>
          <Route path="/quiz/java" element={<Java/>}></Route>
          <Route path="/quiz/python" element={<Python/>}></Route>
          <Route path="/quiz/web" element={<Web/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
