import React, { Component } from "react";
import profileimg from "../../Components/assests/imgs/pp.jpg";
import "../../layout/Profile.css";
import { Link } from "react-router-dom";
import { MdSettingsPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { BiPencil } from "react-icons/bi";
import StudentEducation from "./StudentEducation/StudentEdu";
import StudentWorkExp from "./StudentWorkExp/StudentWorkExp";
import StudentCourses from "./StudentCourses/StudentCourses";
import StudentSkill from "./StudentSkill/StudentSkill";
import Studentinterest from "./StudentSkill/StudentInterest";
import StudentLanguage from "./StudentSkill/StudentLanguage";
import StudentReviews from "./StudentReviews/StudentReviews";
import Footer2 from "../Common/Footer2";
import "../../layout/Home.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { ProfileImgLoader } from "../../loader";

// import { Redirect } from "react-router-dom";
import { axios } from "../../Api/axios";

class Profile extends Component {
  state = {
    name: "",
    image: "",
    email: "",
    department: "",
    start_year: 0,
    end_year: 0,
    date_of_birth: "",
    age: 0,
    reg_no: 0,
    gender: "",
    period: 0,
    gpa: null,
    nationality: "",
    country: "",
    city: "",
    profile_updated: false,
    profile_score: 0,
    university: "",
    phone_number: "",
    educations: [],
    work_experience: [],
    courses: [],
    skills: [],
    interests: [],
    languages: [],
    reviews: [],
    accounts: [],
  };

  async componentDidMount() {
    await axios
      .get("/W/student/get-profile")
      .then((res) => {
        this.setState({
          id: res.data.response.data.name.id,
          name: res.data.response.data.name,
          image: res.data.response.data.image,
          email: res.data.response.data.email,
          department: res.data.response.data.department,
          start_year: res.data.response.data.start_year,
          end_year: res.data.response.data.end_year,
          date_of_birth: res.data.response.data.date_of_birth,
          age: res.data.response.data.age,
          reg_no: res.data.response.data.reg_no,
          gender: res.data.response.data.gender,
          period: res.data.response.data.period,
          gpa: res.data.response.data.gpa,
          nationality: res.data.response.data.nationality,
          country: res.data.response.data.country,
          city: res.data.response.data.city,
          profile_updated: res.data.response.data.profile_updated,
          profile_score: res.data.response.data.profile_score,
          university: res.data.response.data.university,
          phone_number: res.data.response.data.phone_number,
          educations: res.data.response.data.educations,
          work_experience: res.data.response.data.work_experience,
          courses: res.data.response.data.courses,
          skills: res.data.response.data.skills,
          interests: res.data.response.data.interests,
          languages: res.data.response.data.languages,
          reviews: res.data.response.data.reviews,
          accounts: res.data.response.data.accounts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // console.log(this.state.accounts);
    let id = this.props.id;
    return (
      <div className="container-fluid ">
        <div className="container  ">
          <div className="d-flex flex-row flex-wrap">
            {this.state.image ? (
              <img
                alt="AAST Trainery Student Profile picture"
                className="d-flex flex-column col-2 col-md-1 me-4 profileImage"
                id="profilepp"
                src={this.state.image}
              ></img>
            ) : (
              <ProfileImgLoader
                className="me-2 "
                // id="profilepp"
              />
            )}

            <div className="d-flex flex-column col-7 col-md-4 mt-1 me-5">
              <div
                className="d-flex flex-row flex-wrap fs-4"
                style={{ textTransform: "capitalize" }}
              >
                {this.state.name}
              </div>
              <div
                className="d-flex flex-row flex-wrap"
                style={{ textTransform: "capitalize" }}
              >
                {this.state.university}
              </div>
              <div
                className="d-flex flex-row flex-wrap "
                style={{ textTransform: "capitalize" }}
              >
                {/* <div className="d-flex me-1 flex-column col-md-9 col-12"> */}
                {this.state.department}
              </div>
              {/* </div> */}
              {/* <div className="d-flex flex-column col-md-7 col-12"> */}
              <div
                className="d-flex flex-row flex-wrap "
                style={{ textTransform: "capitalize" }}
              >
                <span id="gpa" className="">
                  {this.state.gpa}
                </span>
              </div>
              {/* </div> */}
              <div className="d-flex flex-row flex-wrap">
                {this.state.start_year} - {this.state.end_year}
              </div>
            </div>
            <div className="d-flex flex-column col-md-3 "></div>
            <div
              id="topbtns"
              className="d-flex flex-column col-12 col-md-3 mt-1"
            >
              <div className="d-flex flex-row">
                <div className="d-flex flex-column col-6 col-md-6">
                  <Link
                    alt="AAST Trainery generate Cv button"
                    id="bluebtn1"
                    renderAs="button"
                    className="btn shadow-none "
                    // to="/Register"
                  >
                    Generate CV
                  </Link>
                </div>
                <div className="d-flex flex-column col-6 col-md-6">
                  <Link
                    id="bluebtn"
                    renderAs="button"
                    className="btn shadow-none bluebtn "
                    to="/Profile/General"
                  >
                    Update Info
                  </Link>
                </div>
              </div>
              <div className="d-flex flex-row ">
                <div className="d-flex flex-column col-4 col-md-2">
                  <Link
                    renderAs="button"
                    className="btn shadow-none goldbtn"
                    to="/Cv-Portfolio"
                  >
                    My Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="blueribbon" className="container-fluid">
          <div className="container">
            <div className="d-flex flex-row flex-wrap">
              <div className="d-flex flex-column col-12 col-md-3 me-4">
                <div id="orangetitle" className="d-flex flex-row fs-4">
                  General Information:
                </div>
                <div
                  className="d-flex flex-row info"
                  style={{ textTransform: "capitalize" }}
                >
                  Gender: {"  "}
                  {this.state.gender}
                </div>
                <div className="d-flex flex-row info">
                  Age:
                  {"  "}
                  {this.state.age ? this.state.age : " "}
                </div>
                <div
                  className="d-flex flex-row info"
                  style={{ textTransform: "capitalize" }}
                >
                  Nationality: {"  "}
                  {this.state.nationality}
                </div>
                <div
                  className="d-flex flex-row info"
                  style={{ textTransform: "capitalize" }}
                >
                  Address: {"  "}
                  {this.state.city}, {this.state.country}.
                </div>
              </div>
              <div className="d-flex flex-column col-12 col-md-5 me-5"></div>
              <div className="d-flex flex-column col-12 col-md-3">
                <div
                  id="orangetitle"
                  className="d-flex flex-row fs-4 orangetitle2"
                >
                  Contact Information:
                </div>
                <div className="d-flex flex-row info">
                  <MdSettingsPhone
                    alt="Phone icon"
                    fill="white"
                    color="white"
                    className="me-2 icon"
                  />
                  {this.state.phone_number}
                </div>
                <div
                  className="d-flex flex-row info"
                  style={{ textTransform: "capitalize" }}
                >
                  <HiOutlineMail
                    alt="mail icon"
                    fill="white"
                    color="white"
                    className="me-2 icon"
                  />
                  {this.state.email}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div id="education" className="card mt-5">
            <div className="card-body">
              <div className="d-flex flex-row titlecard profiletitle fs-4 mb-2">
                Education
                <Link
                  renderAs="button"
                  className="ms-3 plus"
                  to="Profile/Education"
                  alt="add new "
                >
                  +
                </Link>
              </div>
              {this.state.educations.map((item) => {
                return (
                  <StudentEducation
                    id={item.id}
                    key={item.id}
                    schoolName={item.school_name}
                    city={item.city}
                    country={item.country}
                    fromDate={item.from}
                    toDate={item.to}
                    cred={item.credential_url}
                    credential={item.credential}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="container">
          <div id="education" className="card mt-5">
            <div className="card-body">
              <div className="d-flex flex-row titlecard profiletitle fs-4 mb-2">
                Work Experience
                <Link
                  renderAs="button"
                  className="  ms-3 plus"
                  to="Profile/Experience"
                  // to="/Register"
                  alt="add new "
                >
                  +
                </Link>
              </div>
              {this.state.work_experience.map((item) => {
                return (
                  <StudentWorkExp
                    key={item.id}
                    id={item.id}
                    job_title={item.job_title}
                    experience_type={item.experience_type}
                    company_name={item.company_name}
                    city={item.city}
                    country={item.country}
                    from={item.from}
                    to={item.to}
                    cred={item.cred}
                    cred_url={item.cred_url}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="container">
          <div id="education" className="card mt-5">
            <div className="card-body">
              <div className="d-flex flex-row titlecard profiletitle fs-4 mb-2">
                Courses
                <Link
                  renderAs="button"
                  className="  ms-3 plus"
                  to="Profile/Courses"
                  alt="add new "
                >
                  +
                </Link>
              </div>
              {this.state.courses.map((item) => {
                return (
                  <StudentCourses
                    key={item.id}
                    id={item.id}
                    course_name={item.course_name}
                    course_provider={item.course_provider}
                    cred={item.cred}
                    cred_url={item.cred_url}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="container">
          <div id="education" className="card mt-5">
            <div className="card-body">
              <div className="d-flex flex-row titlecard profiletitle fs-4 mb-2">
                <div className="d-flex titlecard flex-row profiletitle col-md-10 col-10 me-3 ">
                  Skills
                </div>
              </div>
              <div className=" d-flex flex-row flex-wrap col-12 mb-2 col-md-12 me-1 fs-5">
                Tools and Fields of Expertise{" "}
                <Link
                  renderAs="button"
                  className="  ms-3 plus"
                  to="Profile/Skills"
                  style={{ width: " 1.5em", alignContent: "center" }}
                  alt="add new "
                >
                  +
                </Link>
              </div>

              {this.state.skills.map((item) => {
                return (
                  <StudentSkill
                    key={item.id}
                    id={item.id}
                    skill_name={item.skill_name}
                    years_of_exp={item.years_of_exp}
                  />
                );
              })}
              <hr />
              <div className=" d-flex flex-row col-12 col-md-12 ">
                <div className="d-flex flex-column col-5 col-md-2 fs-5 me-0 ">
                  Interests
                </div>
                <div className="d-flex flex-column col-6 col-md-9 fs-5 ms-0 me-3 interestmobile interestmobilee">
                  <Link
                    renderAs="button"
                    className=" plus plusmarginback "
                    to="Profile/Interest"
                    style={{ width: " 1.5em", alignContent: "center" }}
                    alt="add new "
                  >
                    +
                  </Link>
                </div>
                <div
                  id="hiddenhover"
                  className=" d-flex flex-column col-1 col-md-1 p-0 "
                  style={{ alignContent: "flex-end" }}
                >
                  <Link
                    id="interestpen"
                    renderAs="button"
                    to={`/Profile/Interest/update`}
                  >
                    <BiPencil
                      id="skillnamepen"
                      className="skillnamepencil"
                      fill="#cd8930"
                      color="#cd8930"
                    />
                  </Link>
                </div>
              </div>
              <div
                className=" d-flex flex-row flex-wrap col-12 col-md-12 "
                id="interesttags"
              >
                {this.state.interests.map((i) => {
                  return (
                    <Studentinterest
                      key={i.id}
                      id={i.id}
                      interest={i.interest}
                    />
                  );
                })}
              </div>

              <hr />

              <div className=" d-flex flex-row flex-wrap col-12 mb-2 col-md-12 me-1 fs-5">
                Languages
                <Link
                  renderAs="button"
                  className=" plus ms-3 plusmarginback"
                  to="Profile/Language"
                  style={{ width: " 1.5em", alignContent: "center" }}
                  alt="add new "
                >
                  +
                </Link>
              </div>
              {this.state.languages.map((i) => {
                return (
                  <StudentLanguage
                    key={i.id}
                    id={i.id}
                    language={i.language}
                    level={i.level}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="container">
          <div id="education" className="card mt-5">
            <div className="card-body">
              <div className="d-flex flex-row titlecard profiletitle col-md-11 col-10 fs-4 mb-2">
                <div className="d-flex titlecard flex-row profiletitle col-md-11 col-10 me-5 ">
                  Accounts
                  <Link
                    renderAs="button"
                    className="  ms-3 plus"
                    to="Profile/Accounts"
                  >
                    +
                  </Link>
                </div>
              </div>

              <div className=" d-flex flex-row col-12 col-md-12 ">
                <div className="d-flex flex-column col-5 col-md-2 fs-5 me-0 ">
                  <div className="d-flex flex-row  ">
                    <div className=" d-flex flex-row   mt-2   ">
                      {/* {this.props.} */}
                      {this.state.accounts ? (
                        <>
                          {this.state.accounts.facebook ? (
                            <a
                              target="_blank"
                              href={this.state.accounts.facebook}
                            >
                              <FaFacebookF
                                fill="#1e4274"
                                color="#1e4274"
                                id="accountsicons"
                                className="fs-4 me-4"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {this.state.accounts.instagram ? (
                            <a
                              target="_blank"
                              href={this.state.accounts.instagram}
                            >
                              <FaInstagram
                                fill="#1e4274"
                                color="#1e4274"
                                id="accountsicons"
                                className="fs-4 me-4"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {this.state.accounts.youtube ? (
                            <a
                              target="_blank"
                              href={this.state.accounts.youtube}
                            >
                              <FaYoutube
                                fill="#1e4274"
                                color="#1e4274"
                                id="accountsicons"
                                className="fs-4 me-4"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {this.state.accounts.linkedin ? (
                            <a
                              target="_blank"
                              href={this.state.accounts.linkedin}
                            >
                              <FaLinkedinIn
                                fill="#1e4274"
                                color="#1e4274"
                                id="accountsicons"
                                className="fs-4 me-4"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {this.state.accounts.website ? (
                            <a
                              target="_blank"
                              href={this.state.accounts.website}
                            >
                              <FaLink
                                fill="#1e4274"
                                color="#1e4274"
                                id="accountsicons"
                                className="fs-4 me-4"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {this.state.accounts.behance ? (
                            <a
                              target="_blank"
                              href={this.state.accounts.behance}
                            >
                              <FaBehance
                                fill="#1e4274"
                                color="#1e4274"
                                id="accountsicons"
                                className="fs-4 me-4"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                          {this.state.accounts.github ? (
                            <a
                              target="_blank"
                              href={this.state.accounts.github}
                            >
                              <FaGithub
                                fill="#1e4274"
                                color="#1e4274"
                                id="accountsicons"
                                className="fs-4 me-4"
                              />
                            </a>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div id="education" className="card mt-5">
            <div className="card-body pb-5 ">
              <div className="d-flex flex-row titlecard profiletitle fs-4 mb-2">
                Reviews
              </div>
              <div className="flex-row d-flex mt-1 ">
                <StudentReviews />
              </div>
            </div>
          </div>
        </div>
        <Footer2 />
      </div>
    );
  }
}
export default Profile;
{
  /* {this.state.reviews.map((item) => {
                  return (
                    <studentReviews
                    // key={item.id}
                    // courseProviderName={item.school_name}
                    // courseName={item.courseName}
                    // Coursecred={item.courseCredential_url}
                    />
                  );
                })} */
}
{
  /*<div className='container'>
          <div id='education' className='card mt-5'>
            <div className='card-body'>
              <div className='d-flex flex-row titlecard profiletitle fs-4 mb-2'>
                Accounts
                <Link
                  renderAs='button'
                  className='  ms-3 plus'
                  // to="/Register"
                >
                  +
                </Link>
              </div>
              {this.state.courses.map((item) => {
                return (
                  <studentAccount
                    key={item.id}
                    courseProviderName={item.school_name}
                    courseName={item.courseName}
                    Coursecred={item.courseCredential_url}
                  />
                );
              })}
            </div>
          </div>
        </div>*/
}
