import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../../redux/slices/User_Slice';
import { useNavigate } from 'react-router-dom';



const stockSymbols = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'GOOGL', name: 'Google Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'RELI', name: 'Reliance Industries Limited' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY', name: 'Infosys Limited' },
  { symbol: 'HDB', name: 'HDFC Bank Limited' },
  { symbol: 'WIT', name: 'Wipro Limited' },
];

function NavbarComp() {
  const [selectedStock, setSelectedStock] = useState(stockSymbols[0].symbol);
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    document.getElementById("sidebar-active").checked = false;
    document.getElementById("sidebar-active2").checked = false;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);
  
  const handleExternalLinkClick = () => {
    handleLinkClick(); 
  };

  const handleClearUserData = () => {
    dispatch(clearUserData());
    navigate("/");
    document.getElementById("sidebar-active").checked = false;
    document.getElementById("sidebar-active2").checked = false;
  };

  return (
    <>
      <div style={{ marginBottom: 0, paddingBottom: 0 }}>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Roboto:wght@100&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          />
        </Helmet>
        <header>
          <nav>
            <input type="checkbox" id="sidebar-active" />
            <label htmlFor="sidebar-active" className="open-sidebar-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </label>
            <label id="overlay" htmlFor="sidebar-active"></label>
            <div className="links-container">
              <label htmlFor="sidebar-active" className="close-sidebar-button">
                <svg className="svg-close" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </label>

              <Link className="home-link montserrat-a" to="/" onClick={handleLinkClick}>Home</Link>
              <Link className="montserrat-a" to="/news" onClick={handleLinkClick}>Finance News</Link>
              <Link className="montserrat-a" to="/algorithm-trading" onClick={handleLinkClick}>Algorithmic Trading</Link>
              <Link className="montserrat-a" to="/learn-space" onClick={handleLinkClick}>Learn Space</Link>
              <Link className="montserrat-a" to="/fifth-page" onClick={handleLinkClick}>Products</Link>
              <a className="montserrat-a" href="https://cashflowmastery.store/" target="_blank" rel="noopener noreferrer" onClick={handleExternalLinkClick}>
                Community Forum
              </a>
            </div>
          </nav>

          <h1 className="chakra-petch-light-italic">GAIN</h1>

          <nav className="nav2">
            <input type="checkbox" id="sidebar-active2" />
            <label htmlFor="sidebar-active2" className="open-sidebar-button2">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
            </label>
            <label id="overlay2" htmlFor="sidebar-active2"></label>
            <div className="links-container2">
              <label htmlFor="sidebar-active2" className="close-sidebar-button2">
                <svg id="svg-close" xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </label>

              {user.email === null ? (
                <>
              <Link className="montserrat-a" to="/login" onClick={handleLinkClick}>Login</Link>
              <Link className="montserrat-a" to="/signup" onClick={handleLinkClick}>Register</Link>
              </>
            ) : (
              <>
                <Link className="montserrat-a" to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                <Link className="montserrat-a"  onClick={handleClearUserData}>Logout</Link>
              </>
            )}
            </div>
          </nav>
        </header>
            <div className="marque">
        <marquee className="marquee">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
          </svg>
          <p> Growth Advisory Investment Network</p>
        </marquee>
        </div>
      </div>
    </>
  );
}

export default NavbarComp;
