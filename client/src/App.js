import './App.css';
import Navbar from './Navbar';
import { MDBContainer } from 'mdb-react-ui-kit';
import PageFooter from './Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomePage from './LandingPage';


function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <MDBContainer>
      <Navbar />
      <HomePage />
      <PageFooter />
    </MDBContainer>
  );
};

export default App;

// <div className="App">
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