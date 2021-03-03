import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../layout/Profile.css";
import { BiPencil } from "react-icons/bi";
export default class StudentEdu extends Component {
  render() {
    return (
      <>
        <div
          id="lightfont"
          className="d-flex flex-row  fs-5 "
          style={{ textTransform: "capitalize" }}
        >
          <div className=" d-flex flex-row col-10 col-md-11 me-1">
            {this.props.courseProviderName}
          </div>
          <div
            id="hiddenhover"
            className=" d-flex flex-row col-2 col-md-1 p-0 ms-3"
          >
            <Link
              renderAs="button"

              // to="/Register"
            >
              <BiPencil fill="#cd8930" color="#cd8930" />
            </Link>
          </div>
        </div>
        <div className="d-flex flex-row fs-6 ">
          <div className=" d-flex flex-row col-12 col-md-12">
            {this.props.courseName}.
          </div>
        </div>
        <div className="d-flex flex-row fs-6 ">
          <div className=" d-flex flex-row col-12 col-md-12"></div>
        </div>
        <div className="d-flex flex-row fs-6 mt-2 ">
          <a
            id="goldcredentials"
            renderAs="button"
            href={this.props.courseCredential_url}
            className="  mb-1   d-flex flex-row col-12 col-md-3"
            // to="/Register"
          >
            See credentials
          </a>
        </div>
        <hr />
      </>
    );
  }
}