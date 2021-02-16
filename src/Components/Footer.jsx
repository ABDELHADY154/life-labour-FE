/** @format */

import React, { Component } from "react";
import logo from "../Components/assests/icons/White-Logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaChevronUp,
} from "react-icons/fa";
import { BsChevronUp } from "react-icons/bs";
import ScrollTop from "react-scrolltop-button";
import "../layout/Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="Container flex-row">
        <footer className="footer-area footer--light m-auto prim">
          <div className="footer-big">
            <div className="container-fluid">
              <div className="row ml-4">
                <div className="col-md-5 col-sm-4 ">
                  <div className="footer-widget d-flex justify-content-center ">
                    <div className="mt-2 flex-column">
                      <img
                        id="footlogo"
                        // className="navbar-brand img-rounded m-auto "
                        src={logo}
                        width="40%"
                      ></img>
                      <p className="mt-2 ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Consectetur dictumst nisi blandit ornare viverra
                        eleifend
                      </p>
                      <p id="Allrights" className="mt-3">
                        © 2020 AAST Trainery. All Rights Reserved.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-4  ">
                  <div id="About" className="footer-widget d-flex ">
                    <div className="footer-menu flex-column ">
                      <h4 className="footer-widget-title  ">About</h4>
                      <ul>
                        <li>
                          <a href="#">About Us</a>
                        </li>
                        <li>
                          <a href="#">Contact Us</a>
                        </li>

                        <li s>
                          <a href="#">
                            <FaInstagram className="m-2" />
                          </a>
                          <a href="#">
                            <FaFacebookF className="m-2 " />
                          </a>
                          <a href="#">
                            <FaLinkedinIn className="m-2" />
                          </a>
                          <a href="#">
                            <FaYoutube className="m-2" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 mt-2">
                  <div className="footer-widget d-flex">
                    <div id="Account" className="footer-menu flex-column">
                      <h4 className="footer-widget-title">Account</h4>
                      <ul>
                        <li>
                          <a href="#">Sign Up</a>
                        </li>
                        <li>
                          <a href="#">Sign In</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollTop
            text={<BsChevronUp fontSize="30px" />}
            style={{
              backgroundColor: "transparent",
              borderRadius: "5px",
              color: "#cd8930",
              borderColor: "#cd8930",
            }}
            icon={<BsChevronUp />}
          />
        </footer>
      </div>
    );
  }
}
