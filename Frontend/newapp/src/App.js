import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginEvent from './components/Login';
import RegisterEvent from './components/Register';
import HomeEvent from './components/home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginEvent />} />
        <Route path="/register" element={<RegisterEvent />} />
        <Route path="/home" element={<HomeEvent />} />
      </Routes>
    </Router>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
