import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import ActivityNavbar from "./Navbar";

import Footer2 from "../Common/Footer2";

import career from "../assests/imgs/career.png";
import { axios } from "../../Api/axios";

import "../../layout/EditInfo.css";
class Appointment extends Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    await axios
      .get("/W/student/studentSessions")
      .then((res) => {
        this.setState({
          data: res.data.response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Link to="/Profile/Activity/Appointment" />
        <div className="container mb-5">
          <ActivityNavbar setactive={"Appointment"} />
          {!this.state.data
            ? ""
            : this.state.data.map((data) => {
                return (
                  <Link to={`/CareerCoaching/Advising/${data.id}`}>
                    <div class="card mb-5 mt-3">
                      <div class="row ">
                        <div class="d-flex flex-column col-md-2 col-sm-3 col-1 d-none d-sm-flex ms-3">
                          <img
                            className="d-flex justify-content-center align-self-center align-items-center col-md-9 col-sm-12 mt-3"
                            src={data.image}
                          />
                        </div>

                        <div class="col-md-8 col-sm-7 col-8 ms-3 mt-3">
                          <div class="">
                            <h5 class="fw-bold">{data.title}</h5>
                            <div className="d-flex flex-row ">
                              <p className="me-3">Date Booked</p>
                              <p>15 Oct 2020</p>
                            </div>
                            <div className="d-flex flex-row ">
                              <p className="me-3">Time Booked</p>
                              <p>9:00 AM</p>
                            </div>
                            <p class="">
                              <small id="gold">Resend this email</small>
                            </p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="d-flex justify-content-end mb-4">
                            <button className="applyBtn col-md-2 col-lg-1 col-sm-2 col-4  me-2">
                              Contact
                            </button>
                            <button className="applyBtn col-lg-1 col-md-2 col-sm-2 col-4 mb-5">
                              Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
        <Footer2 />
      </div>
    );
  }
}
export default Appointment;
