import React from "react";
import app_store_btn from "../../Assets/images/app_store_btn.png";
import goole_play_btn from "../../Assets/images/goole_play_btn.png";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsDribbble } from "react-icons/bs";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-links">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-top-area">
                  {/* <div className="left">
                    <a href="#">
                      <img src={app_store_btn} alt="" />
                    </a>
                    <a href="#">
                      <img src={goole_play_btn} alt="" />
                    </a>
                  </div> */}
                  <div className="right">
                    <ul className="links">
                      <li>
                        <Link to="/">
                          <a href="#">Home</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Results">
                          <a href="#">Results</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/About">
                          <a href="#">About</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Faq">
                          <a href="#">Faq's</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <hr className="hr2" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="copyr-text">
                  <span>Copyright © 2020.All Rights Reserved By</span>
                  <a href="#"> "Luck Me" ByFantra</a>
                </div>
              </div>
              <div className="col-lg-6 align-self-center">
                <ul className="footer-social-links">
                  <li>
                    <a href="#">
                      <i className="fa">
                        <BsTwitter />
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa ">
                        <FaFacebookF />
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa ">
                        <BsInstagram />
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa ">
                        <BsDribbble />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
