import React from "react";
import Dota2 from '../images/HomePage/Dota2.jpeg';
import Fifa23 from '../images/HomePage/Fifa23.jpeg';
import CSGO from '../images/HomePage/CSGO.png';
import Lol from '../images/HomePage/Lol.jpeg';
import './HomePage.css'

function HomePage() {
    return (
        <div>
    <div className="home-page-tour">
      <h2 className="latest-news">
        <span className="neon-line"></span>
        Latest News
        <span className="neon-line"></span>
      </h2>

      <div className="container">
        <table>
          <tbody>
            <tr className='DotaRow'>
              <td>
                <img className="ln-image" src={Dota2} alt="Dota 2"/>
              </td>
              <td>
                <div className="subhead-container">
                  <h4 className="subhead">Dota 2</h4>
                  <hr/>
                  <p>Release date of article</p>
                </div>
                <p>Description</p>
              </td>
            </tr>
            <tr className='FifaRow'>
              <td>
                <img className="ln-image" src={Fifa23} alt='Fifa 23'/>
              </td>
              <td>
                <div className="subhead-container">
                  <h4 className="subhead">Fifa 23</h4>
                  <p>Release date of article</p>
                </div>
                <p>Description</p>
              </td>
            </tr>
            <tr className='CSRow'>
              <td>
                <img className="ln-image" src={CSGO} alt='CS:GO'/>
              </td>
              <td>
                <div className="subhead-container">
                  <h4 className="subhead">CS:GO</h4>
                  <p>Release date of article</p>
                </div>
                <p>Description</p>
              </td>
            </tr>
            <tr className='LolRow'>
              <td>
                <img className="ln-image" src={Lol} alt='LOL'/>
              </td>
              <td>
                <div className="subhead-container">
                  <h4 className="subhead">League of Legends</h4>
                  <p>Release date of article</p>
                </div>
                <p>Description</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
        </div>
    )
}

export default HomePage;