import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../layout/Profile.css";
import { BiPencil } from "react-icons/bi";

export default class StudentWorkExp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div
          id="lightfont"
          className="d-flex flex-row  fs-5 "
          style={{ textTransform: "capitalize" }}
        >
          <div className=" d-flex flex-row flex-wrap col-10 col-md-10 me-1 mt-2 ">
            <div className="d-flex flex-column col-5 col-md-2 fs-6 plus ">
              {this.props.interest}
            </div>
          </div>
          <div
            id=""
            className=" d-flex flex-row flex-wrap col-0 col-md-0  fs-6 "
          ></div>
          <div id="" className=" d-flex flex-row  col-6 col-md-8 "></div>
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
      </>
    );
  }
}
