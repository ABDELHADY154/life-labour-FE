import React, { Component, useState } from "react";
import { axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import "../../layout/Profiless.css";
import img from "../../Components/assests/imgs/rec2.png";
import img2 from "../../Components/assests/imgs/cib.png";
import "../../layout/Home.css";
import Footer2 from "../Common/Footer2";
import ReactStars from "react-rating-stars-component";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
// import { CarouselReviews } from "./CarouselReviews";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Opportunity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPixelsY: 0,
      review: [],
      comment: "",
      rate: 0,
      error: {},
      data: {},
      departments: [],
      tags: [],
      requirements: [],
      FormLoading: true,
      saved: false,
      applied: false,
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
    await axios
      .get(`/W/student/post/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          id: res.data.response.data.id,
          data: res.data.response.data,
          departments: res.data.response.data.departments,
          tags: res.data.response.data.tags,
          requirements: res.data.response.data.requirements,
          saved: res.data.response.data.saved,
          status: res.data.response.data.status,
          FormLoading: false,
        });
        if (this.state.data.saved === true) {
          this.setState({
            saved: true,
          });
        }
        if (this.state.applied == "applied") {
          this.setState({
            applied: true,
          });
        }
        // console.log(this.state.data.applied);
      })
      .catch((err) => {
        this.setState({ FormLoading: true });
        console.log(err);
      });
    await axios
      .get(`/W/student/review/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          // id: res.data.response.data.id,
          review: res.data.response.data,
        });
        // console.log(res.data.response.data.errors);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleSave = async (e) => {
    this.setState({ saved: !this.state.saved ? true : false });
    console.log();
    await axios
      .post(`/W/student/save/${this.state.data.id}`)
      .then((save) => {
        if (save.status === 200) {
          this.setState({
            saved: true,
          });
        }
      })
      .catch((error) => {
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 404
        ) {
          sessionStorage.clear("token");
          sessionStorage.clear("status");
          this.setState({ loggedIn: false });
          window.location.reload();
        }
      });
  };
  handleUnSave = async (e) => {
    this.setState({ saved: !this.state.saved ? true : false });

    await axios
      .post(`/W/student/unsave/${this.state.data.id}`)
      .then((save) => {
        if (save.status === 200) {
          this.setState({
            saved: false,
          });
        }
      })
      .catch((error) => {
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 404
        ) {
          sessionStorage.clear("token");
          sessionStorage.clear("status");
          this.setState({ loggedIn: false });
          window.location.reload();
        }
      });
  };
  handleApple = async (e) => {
    this.setState({ applied: !this.state.applied ? true : false });

    await axios
      .post(`/W/student/apply/${this.state.data.id}`)
      .then((apply) => {
        if (apply.status === 200) {
          this.setState({
            applied: true,
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 404
        ) {
          sessionStorage.clear("token");
          sessionStorage.clear("status");
          this.setState({ loggedIn: false });
          window.location.reload();
        }
      });
  };
  handleunApple = async (e) => {
    this.setState({ applied: !this.state.applied ? true : false });
    await axios
      .post(`/W/student/unApply/${this.state.data.id}`)
      .then((unapply) => {
        if (unapply.status === 200) {
          this.setState({
            applied: false,
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 404
        ) {
          sessionStorage.clear("token");
          sessionStorage.clear("status");
          this.setState({ loggedIn: false });
          window.location.reload();
        }
      });
  };
  handleReview = async (e) => {
    this.setState({ FormLoading: true });
    e.preventDefault();
    const review = {
      comment: this.state.comment,
      rate: this.state.rate,
      id: this.state.id,
    };

    return await axios
      .post(`/W/student/review/${this.props.match.params.id}`, review)
      .then((response) => {
        this.setState({
          loggedIn: true,

          FormLoading: false,
        });
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.status === 401) {
          sessionStorage.clear("token");
          sessionStorage.clear("status");
          this.setState({ loggedIn: false });
          window.location.reload();
        }
        this.setState({
          error: {
            rateErr: error.response.data.errors.rate,
            commentErr: error.response.data.errors.comment,
          },
          FormLoading: false,
        });
      });
  };
  render() {
    // console.log(this.state.review);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>
        <LoadingOverlay
          active={this.state.FormLoading}
          spinner={<BounceLoader color="#cd8930" />}
          color={"#cd8930"}
          styles={{
            overlay: (base) => ({
              ...base,
              background: "rgb(255, 255, 255)",
              stroke: "rgba(255, 0, 0, 0.5)",
            }),
          }}
        >
          <div className="container ">
            <div className="d-flex flex-row mb-3 ">
              <Link to={`/CompanyProfile/${this.state.data.company_id}`}>
                <img
                  alt={this.state.data.company_name}
                  src={this.state.data.company_logo}
                  className="ms-1 me-3 col-2 rounded-circle companyImg col-xs-12"
                />
              </Link>
              <div className="col-12 mt-3 ">
                <div className="d-flex flex-row w-7">
                  <h4 className="opportunity col-md-7 col-7">
                    {this.state.data.title}
                  </h4>
                </div>
                <div className="d-flex flex-row">
                  <Link
                    className="col-6 col-lg-10 col-md-6 col-sm-6 "
                    to={`/CompanyProfile`}
                  >
                    <p className=" company">{this.state.data.company_name}</p>
                  </Link>
                  <p className="col-2 col-md-2 col-sm-2 col-xs-2 paid">
                    {this.props.salary == "Paid" ? "Paid" : "Unpaid"}
                  </p>
                </div>
                <div className=" departments d-flex flex-row">
                  {this.state.departments.map((item) => {
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
            </div>
            <div className=" d-flex flex-row flex-wrap col-12 col-md-12">
              {this.state.tags.map((item) => {
                return (
                  <Interest
                    id={item.id}
                    key={item.id}
                    interest={item.interest}
                  />
                );
              })}
            </div>

            <div className="mt-4">
              <h5 className="companyTitel">Overview</h5>
              <div className="row d-flex justify-content-between">
                <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-6 ">
                  <div className="row d-flex justify-content-between">
                    <div className="col-6 col-xl-5 col-xxl-5 col-lg-6 col-md-5 col-sm-6 col-xs-6  titleCol">
                      <p className="overvireTitle mb-1">Published on:</p>
                      <p className="overvireTitle mb-1">Vacancy:</p>
                      <p className="overvireTitle mb-1">Gender:</p>
                      <p className="overvireTitle mb-1">Type:</p>
                      <p className="overvireTitle mb-1">Salary:</p>
                      <p className="overvireTitle mb-1">
                        Application deadline:
                      </p>
                      <p className="overvireTitle mb-1">location:</p>
                    </div>
                    <div className="col-6 col-xl-7 col-xxl-7 col-lg-6 col-md-7 col-sm-6 col-xs-6 discCol">
                      <p className=" overvireTxt mb-1">
                        {this.state.data.published_on}
                      </p>
                      <p className="overvireTxt mb-1">
                        {this.state.data.vacancy}
                      </p>
                      <p className="overvireTxt mb-1">
                        {this.state.data.gender}
                      </p>
                      <p className="overvireTxt mb-1">{this.state.data.type}</p>
                      <p className="overvireTxt mb-1">
                        {this.state.data.salary}
                      </p>
                      <p className="overvireTxt mb-1">
                        {this.state.data.application_deadline}
                      </p>
                      <a
                        className="overvireTxt location mb-1 "
                        href={`http://maps.google.com/?q=1200:${this.state.data.location}`}
                      >
                        {this.state.data.location}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="companyTitel">Description</h5>
                <p className="companyDesc">{this.state.data.description}</p>
              </div>

              <div className="mt-4">
                <h5 className="companyTitel">Requirements</h5>
                <ul className="reuirLi">
                  {this.state.requirements.map((item) => {
                    return (
                      <Requirements
                        id={item.id}
                        key={item.id}
                        requirements={item.requirements}
                        req={item.req}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="d-flex flex-row flex-wrap mb-4 mt-5">
              <div className="d-flex flex-column col-4 col-md-1 me-4 "></div>
              <div className="d-flex flex-column col-4  col-md-1 me-4 "></div>
              <div
                id="drop"
                className="d-flex flex-column col-md-3  
                             justify-space-between"
              ></div>
              <div className="  d-flex flex-row col-12 col-md-2 justify-content-start me-1"></div>
              <div className="  d-flex flex-row col-12 col-md-4 justify-content-end btnmovement">
                {this.state.saved == true ? (
                  <BsFillBookmarkFill
                    alt="saved internship opportunity post"
                    id="BsBookmark"
                    fill="#1e4274"
                    className="fs-2 align-self-center col-md-2 col-4"
                    // style={{ marginTop: -5 }}
                    onClick={() => {
                      this.handleUnSave();
                    }}
                    path="0px"
                  />
                ) : this.state.saved == false ? (
                  <BsBookmark
                    alt="save internship opportunity post for later"
                    id="BsBookmark"
                    fill="#1e4274"
                    className="fs-2 align-self-center col-md-2 col-4"
                    path="0px"
                    onClick={() => {
                      this.handleSave();
                    }}
                  />
                ) : (
                  ""
                )}
                {this.state.status == "achieved" ? (
                  <button
                    // to={`/Opportunity/${this.props.id}`}
                    className="text-center appliedBtn px-1 py-0 col-md-4 col-lg-6 col-8 col-sm-8"
                  >
                    Achieved
                  </button>
                ) : this.state.status == "accepted" ? (
                  <button
                    // to={`/Opportunity/${this.props.id}`}
                    className="text-center appliedBtn px-1 py-0 col-md-4 col-lg-6 col-8 col-sm-8"
                  >
                    Accepted
                  </button>
                ) : this.state.status == "applied" ? (
                  <button
                    className="text-center appliedBtn yBtn px-1 py-0 col-md-4 col-lg-6 col-8 col-sm-8 "
                    onClick={() => {
                      this.handleunApple();
                    }}
                  >
                    Applied
                  </button>
                ) : (
                  <button
                    className="text-center applyBtn px-1 py-0 col-md-4 col-lg-6 col-8 col-sm-8"
                    onClick={() => {
                      this.handleApple();
                    }}
                  >
                    Apply
                  </button>
                )}

                {/* {this.state.status == "applied" ? (
                  <button
                    className="text-center appliedBtn yBtn px-1 py-0 col-md-4 col-lg-6 col-8 col-sm-8 "
                    onClick={() => {
                      this.handleunApple();
                    }}
                  >
                    Applied
                  </button>
                ) : (
                  <button
                    className="text-center applyBtn px-1 py-0 col-md-4 col-lg-6 col-8 col-sm-8"
                    onClick={() => {
                      this.handleApple();
                    }}
                  >
                    Apply
                  </button>
                )} */}
              </div>
            </div>
            {/* carousel */}
            <div className="col-12">
              <p className="companyTitel ">Company internship reviews</p>

              <>
                <div>
                  <Slider {...settings} className="mb-5">
                    {this.state.review.length == 0 ? (
                      <div className="">
                        <p className="text-center">No Reviews Were Added</p>
                      </div>
                    ) : (
                      this.state.review.map((data) => {
                        return (
                          <CarouselReviews
                            id={data.id}
                            key={data.id}
                            comment={data.comment}
                            fullName={data.fullName}
                            training_role={data.training_role}
                            rate={data.rate}
                          />
                        );
                      })
                    )}
                  </Slider>
                </div>
              </>
            </div>

            {this.state.status == "achieved" ? (
              this.state.data.reviewed == false ? (
                <>
                  <div className="d-flex flex-row ">
                    <div className="d-flex flex-column col-md-7 me-2  text-wrap bg-none me-5 ">
                      <p className="mb-0 companyTitel" id="Title">
                        Add Your Review
                      </p>
                      <ReactStars
                        className="reviewstars"
                        count={5}
                        // value="3"
                        value={this.state.rate}
                        onChange={(rate) => {
                          this.setState({ rate: rate });
                        }}
                        size={28}
                        activeColor="#F2A23A"
                        edit={true}
                      />
                      {this.state.error && this.state.error.rateErr ? (
                        <p className="editerror text-capitalize">
                          {this.state.error.rateErr}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-row mt-3  ">
                    <textarea
                      placeholder="Enter Your Review Here..."
                      type="text"
                      name="name"
                      className="reviewbox d-flex flex-column col-md-12 col-12 pt-2  px-3"
                      onChange={(e) =>
                        this.setState({ comment: e.target.value })
                      }
                      value={this.state.comment}
                    ></textarea>
                  </div>
                  {this.state.error && this.state.error.commentErr ? (
                    <p className="editerror text-capitalize ">
                      {this.state.error.commentErr}
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="row mb-5 mt-3 ">
                    <div className="col-6"></div>
                    <form
                      onSubmit={this.handleReview}
                      className="d-flex justify-content-end "
                    >
                      <button type="submit" className="applyBtn col-1 ">
                        Review
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <Footer2 />
        </LoadingOverlay>
      </div>
    );
  }
}

class CarouselReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <>
        <div>
          <div className="d-flex flex-row justify-content-center">
            <div className=" carouselCaption text-center col-md-11 mb-2 col-11">
              <p className="txtCarousel lh-sm">{this.props.comment}</p>
            </div>
          </div>
          <center>
            <div className="hrReview position-absolute top-40 start-50 translate-middle "></div>
          </center>
          <div className="d-flex flex-row col-12 col-md-12 text-center fs-5  ">
            <div className="d-flex flex-column col-12 col-md-12">
              <center>
                <p className="txtName">{this.props.fullName}</p>
              </center>
            </div>
          </div>
          <div className="d-flex flex-row  col-12 col-md-12 text-center fs-5  ">
            <div className="d-flex flex-column col-12 col-md-12">
              <center>
                <p className="txtRole">{this.props.training_role}</p>
              </center>
            </div>
          </div>
          <div className="d-flex flex-row  col-12 col-md-12 text-center justify-content-center  mb-2 starsReview">
            <div className="d-flex flex-column justify-content-center col-md-12 align-items-center">
              <ReactStars
                count={5}
                value={this.props.rate}
                edit={false}
                size={23}
                activeColor="#F2A23A"
                aria-label={this.props.rate}
                alt={this.props.rate}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <p className="dep me-2">{this.props.dep_name}</p>;
  }
}

class Interest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="d-flex flex-row me-2 fs-5 ">
        <p
          style={{ textTransform: "capitalize" }}
          className=" d-flex flex-row flex-wrap col-12 col-md-12 tag "
        >
          {this.props.interest}
        </p>
      </div>
    );
  }
}
class Requirements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <li className=" companyDesc reuirLi">{this.props.req} </li>;
  }
}
