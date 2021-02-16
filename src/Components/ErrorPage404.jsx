import React from "react";
import logo from "../Components/assests/imgs/logo.png";
import error from "../Components/assests/imgs/error.png";
import "../layout/ErrorPage.css";

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar ">
          {/* <div className="container-fluid"> */}
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt=""
              width="200"
              height="38"
              className=" d-inline-block align-top img-fluid"
            />
          </a>
          {/* </div> */}
        </nav>
        <div className="content d-flex flex-column flex-lg-row justify-content-Center">
          <div className="col-lg-6 col-12 errolCol">
            <div className="errorTitle">
              <h1 className="title">4</h1>
              <span class="material-icons ">warning</span>
              <h1 className="title">4</h1>
            </div>
            <p className="text ">
              We’re not quite sure what went wrong. You can
              <span className="link"> Go Back </span>, or try looking on our
              <span className="link"> Help Center </span> if you need a hand.
            </p>
          </div>
          <div className="col"></div>
          <img src={error} alt="" class=" col-lg-4 col-12 errorImg " />
        </div>
      </div>
    );
  }
}
export default ErrorPage;
