import './App.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/";
import PageFooter from "./Components/Footer/";
import HomePage from "./Components/LandingPage/";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './Components/User/ResetPassword';
import AccountActivation from './Components/User/AccountActivation';

export const notify = (type, message) => {
  switch (type) {
    case "info":
      toast.info(message);
      return;
    case "error":
      toast.error(message);
      return;
    case "warn":
      toast.warn(message);
      return;
    case "success":
      toast.success(message);
      return;
    default:
      toast(message);
      return;
  }
};

function App() {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MDBContainer>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/activate" element={<AccountActivation />} />
          </Routes>
        </BrowserRouter>
        <PageFooter />
      </MDBContainer>
    </>
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