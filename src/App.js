import './App.css';
import Navbar from './Navbar';
import { Route,Routes } from 'react-router-dom';
import PlayGround from './PlayGround';
import Query from './Query';


function App() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/playground' element={<PlayGround/>}/>
        <Route path='/' element={<Query/>}/>
      </Routes>
    </div>
  );
}

export default App;
