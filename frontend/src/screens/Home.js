import React from 'react'
import { Link } from 'react-router-dom';

import './Home.css'
import UatuImage from '../image/uatu_the_watcher.png';

const Home = (props) => {
  return (
    <div className="home-container">
      <div className="home-container1">
        <div className="home-container2">
          <div className="home-container3">
            <h1 className="home-text">Project UATU</h1>
          </div>
          <div className="home-container4">
            <span className="home-text1">
              Quer otimizar suas operações mas está sem tempo para acompanhar o
              sobe e desce do mercado? Deixe que cuidamos disso para você!
            </span>
          </div>
          <div className="home-container5">
            <Link to="/login" className="home-button button">ENTRAR</Link>
          </div>
        </div>
        <div className="home-container6">
        <img
          src={UatuImage}
          alt="Uatu the Watcher"
          className="home-image"
        />
        </div>
      </div>
    </div>
  )
}

export default Home
