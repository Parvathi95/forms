import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
  <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/" element={<h1>Home</h1>}/>
    </Routes>

    </BrowserRouter>
      
   </div>
  );
}

export default App;
