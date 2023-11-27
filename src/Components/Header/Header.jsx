import React from 'react';
import lucky from "../../Assets/images/lucky-me-logo.png";


function Header() {
  return (
    <div>
        <div className="header-top-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header-top-area-inner">
                      <a href="" className="logo">
                        <img src={lucky} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Header