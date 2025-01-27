import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import { axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import "../../layout/Profiless.css";
import img from "../../Components/assests/imgs/rec2.png";
import img2 from "../../Components/assests/imgs/cib.png";
import "../../layout/Home.css";
import Footer2 from "../Common/Footer2";
import { FiPhone, FiSearch, FiUsers } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineGlobal, AiOutlineMail } from "react-icons/ai";
import { BsArrowUpRight } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import BigCard from "../Explore/BigCard";

export default class advisorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPixelsY: 0,
      data: {},
      internshipPosts: [],
      FormLoading: true,
    };
    window.scrollTo(0, 0);
  }

  handleScroll = () => {
    this.setState({
      scrollPixelsY: window.scrollY,
    });
  };
  async componentDidMount() {
    this.setState({ FormLoading: true });
    console.log(this.props.match.params.id);
    await axios
      .get(`/W/student/advisor/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          id: res.data.response.data.id,
          data: res.data.response.data,
          internshipPosts: res.data.response.data.internshipPosts,
          FormLoading: false,
        });
        console.log(res.data.response.data.internshipPosts);
      })
      .catch(err => {
        this.setState({ FormLoading: true });
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <LoadingOverlay
          active={this.state.FormLoading}
          spinner={<BounceLoader color="#cd8930" />}
          color={"#cd8930"}
          styles={{
            overlay: base => ({
              ...base,
              background: "rgb(255, 255, 255)",
              stroke: "rgba(255, 0, 0, 0.5)",
            }),
          }}
        >
          <div className="container ">
            <div className="row ">
              <div className="d-flex flex-row">
                <img
                  // src={img1}
                  src={this.state.data.image}
                  className="ms-1 me-3 col-2 rounded-circle advisorImg"
                />
                <div className="col-8 mt-3 ">
                  <div className=" w-10">
                    <h4 className="companyName ">{this.state.data.name}</h4>
                    <p className=""> {this.state.data.title}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="companyTitel">Advisor Profile</h5>
                <p className="companyDesc">{this.state.data.bio}</p>
              </div>
              <div className="mt-1">
                <h5 className="companyTitel">Advisor Info</h5>
                <div className="row mt-3">
                  <p className="col-lg-3 col-3 col-md-6 col-sm-12 col-xs-12 companyInfoTxt">
                    <a
                      href={`mailto:${this.state.data.email}`}
                      className="websiteLink"
                      target="_blank"
                    >
                      <AiOutlineMail
                        id="iconss"
                        className="me-2 "
                        color="#CD8930"
                        size="21"
                        style={{ color: "#cd8930 ", size: 10 }}
                      />
                      {this.state.data.email}
                    </a>
                  </p>
                  <p
                    className="col-lg-2 col-2 col-md-6 col-sm-12 col-xs-12 companyInfoTxt"
                    style={{ color: "#1E4274" }}
                  >
                    <FiUsers
                      className="me-2 "
                      color="#CD8930"
                      size="20"
                      style={{ color: "#cd8930 " }}
                    />
                    {this.state.data.university}
                  </p>
                  <p
                    className="col-lg-3 col-3 col-md-6 col-sm-12 col-xs-12 companyInfoTxt"
                    style={{ color: "#1E4274" }}
                  >
                    <FiUsers
                      className="me-2 "
                      color="#CD8930"
                      size="20"
                      style={{ color: "#cd8930 ", size: 10 }}
                    />
                    {this.state.data.department}
                  </p>
                </div>
                <div>
                  <h4 className="companyTitel">Published Internship</h4>

                  {this.state.internshipPosts.map(data => {
                    return (
                      <BigCard
                        title={data.title}
                        company_logo={data.company_logo}
                        salary={data.salary}
                        company_name={data.company_name}
                        departments={data.departments}
                        description={data.description}
                        tags={data.tags}
                        application_deadline={data.application_deadline}
                        // advisor={data.advisor}
                        // post_type={data.post_type}
                        sponsor_image={data.sponsor_image}
                        key={data.id}
                        reviewed={data.reviewed}
                        status={data.status}
                        id={data.id}
                        company_id={data.company_id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Footer2 />
        </LoadingOverlay>
      </div>
    );
  }
}

class CompanyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      tags: [],
    };
  }
  render() {
    return (
      <div className="row mb-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row">
                <img
                  className=" mt-0 d-flex flex-column col-md-1 col-2 me-1"
                  id="imgicon"
                  src={this.props.company_logo}
                />
                <div className=" fs-5 mt-2 ms-2 col-md-10 col-8">
                  {this.props.title}
                </div>
                <div id="goldtab" className=" fs-6 mt-2 col-2 col-md-1">
                  {this.props.salary}
                </div>
              </div>
              <div id="job" className="ms-5 ">
                <div className=" ms-3  mt-1 ">{this.props.company_name}</div>
                <div className="mt-1 ms-2  d-flex flex-row departments">
                  {this.props.departments.map(item => {
                    return (
                      <Departments
                        id={item.id}
                        key={item.id}
                        departments={item.departments}
                        dep_name={item.dep_name}
                      />
                    );
                  })}
                </div>
              </div>
              <p className="card-text mt-2">{this.props.description}</p>

              <div className="d-flex flex-row flex-wrap ">
                {this.props.tags.map(item => {
                  return (
                    <Interest
                      id={item.id}
                      key={item.id}
                      interest={item.interest}
                    />
                  );
                })}

                <div
                  id="drop"
                  className="d-flex flex-column col-md-3  
                 justify-space-between"
                >
                  <p>
                    Deadline {"        "}
                    {this.props.application_deadline}
                  </p>
                </div>
                {/* <div className="  d-flex flex-row col-12 col-md-2 justify-content-start me-1">
                  <BsArrowUpRight
                    className="me-2"
                    color="#cd8930"
                    fill="#cd8930"
                  />
                  <p id="gold">Promoted</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="gold" className="ms-2 ">
        {this.props.dep_name}
      </div>
    );
  }
}

class Interest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className=" me-4 tags  mt-1 mb-1" id="firsttagipad">
        <a href="#" className="tagsipad tagsP " id="tags">
          {this.props.interest}
        </a>
      </div>
    );
  }
}
