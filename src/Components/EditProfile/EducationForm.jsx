import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { axios } from "../../Api/axios";
import "../../layout/EditInfo.css";
import Footer2 from "../Common/Footer2";
import { FiUpload, FiCheck } from "react-icons/fi";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import EditNav from "./EditNav";
// import { FormLoader } from "../../loader";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

export default class EducationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      region: "",
      image: "",
      imageURL: "",
      SchoolUrl: "",
      done: false,
      SchoolName: "",
      FormLoading: false,
      From: "",
      To: "",
      error: {
        creddErr: [],
        fromErr: [],
        toErr: [],
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    window.scrollTo(0, 0);
  }

  state = {
    startDate: new Date(),
  };
  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }
  handleChange = (startDate) => {
    this.setState({
      startDate,
    });
  };
  handleUpload(event) {
    var filename = event.target.value.replace(/^.*[\\\/]/, "");
    this.setState({
      image: URL.createObjectURL(event.target.files[0]),
      imageURL: event.target.files[0],
      UrlName: event.target.files[0].name,
    });
    // console.log(event.target.files[0]);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleDelete = async (e) => {
    if (this.props.match.params.id) {
      this.setState({
        FormLoading: true,
      });
      await axios
        .delete(`/W/student/profile/education/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({
            loggedIn: true,
            done: true,
            FormLoading: false,
          });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({
              done: true,
              FormLoading: false,
            });
          }
          window.location.reload();
        });
    } else
      this.setState({
        loggedIn: false,
      });
  };

  componentDidMount = async () => {
    if (this.props.match.params.id) {
      this.setState({
        FormLoading: true,
      });
      await axios
        .get(`/W/student/profile/education/${this.props.match.params.id}`)
        .then((res) => {
          console.log(res.data.response.data.city);
          this.setState({
            id: res.data.response.data.id,
            SchoolName: res.data.response.data.school_name,
            region2: res.data.response.data.city,
            country: res.data.response.data.country,
            From: res.data.response.data.from,
            To: res.data.response.data.to,
            SchoolUrl: res.data.response.data.credential_url,
            FormLoading: false,
          });
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
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    var formBody = new FormData();
    this.setState({
      FormLoading: true,
    });
    const data = {
      id: this.state.id,
      school_name: this.state.SchoolName,
      city: this.state.region,
      country: this.state.country,
      from: this.state.From,
      to: this.state.To,
      cred_url: this.state.SchoolUrl,
      image: this.state.imageURL ? this.state.imageURL : this.state.image,
    };
    if (this.state.imageURL) {
      formBody.append(
        "cred",
        this.state.imageURL ? this.state.imageURL : this.state.image
      );
    }
    formBody.append("school_name", this.state.SchoolName);
    formBody.append("country", data.country);
    formBody.append("city", data.city);
    formBody.append("from", data.from);
    formBody.append("to", data.to);
    if (data.cred_url !== "") {
      formBody.append("cred_url", data.cred_url);
    }
    if (this.props.match.params.id) {
      return await axios({
        method: "post",
        url: `/W/student/profile/education/${this.props.match.params.id}`,
        data: formBody,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.setState({
            done: true,
            FormLoading: false,
          });
        })
        .catch((error) => {
          this.setState({
            FormLoading: false,
          });
          if (error.response.data.status === 401) {
            sessionStorage.clear("token");
            sessionStorage.clear("status");
            this.setState({ loggedIn: false });
            window.location.reload();
          }

          this.setState({
            error: {
              countryErr: error.response.data.errors.country,
              cityErr: error.response.data.errors.city,
              fromErr: error.response.data.errors.from,
              toErr: error.response.data.errors.to,
              schoolNameErr: error.response.data.errors.school_name,
              credErr: error.response.data.errors.cred_url,
              creddErr: error.response.data.errors.cred,
            },
          });
          // console.log(this.state.SchoolName);
        });
    } else {
      return await axios({
        method: "post",
        url: "/W/student/profile/education",
        data: formBody,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.setState({
            done: true,
            FormLoading: false,
          });

          // console.log(response);
        })
        .catch((error) => {
          this.setState({
            FormLoading: false,
          });
          if (error.response.data.status === 401) {
            sessionStorage.clear("token");
            sessionStorage.clear("status");
            this.setState({ loggedIn: false });
            window.location.reload();
          }

          this.setState({
            error: {
              countryErr: error.response.data.errors.country,
              cityErr: error.response.data.errors.city,
              fromErr: error.response.data.errors.from,

              toErr: error.response.data.errors.to,
              credErr: error.response.data.errors.cred_url,
              schoolNameErr: error.response.data.errors.school_name,
              creddErr: error.response.data.errors.cred,
            },
          });
          // console.log(error.response.data.errors.school_name);
        });
    }
  };
  setactive(val) {
    this.setState({ Education: val });
  }
  render() {
    const { country, region } = this.state;
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />;
    }
    if (this.state.done === true) {
      return <Redirect to="/Profile" />;
    }
    // console.log(this.state);
    return (
      <div>
        <div className="container">
          <form class="g-3 mb-3 text-left " onSubmit={this.handleSubmit}>
            <LoadingOverlay
              active={this.state.FormLoading}
              spinner={<BounceLoader color="#cd8930" />}
              styles={{
                overlay: (base) => ({
                  ...base,
                  background: "rgb(255, 255, 255)",
                }),
              }}
            >
              <EditNav setactive={"Education"} />

              <div className=" row">
                <div class="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 mt-3 mt-sm-0">
                  <label for="inputfullname" class="form-label editLabel ">
                    School Name <span className="red">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control editInput"
                    id="fullname"
                    className={
                      this.state.error && this.state.error.schoolNameErr
                        ? "form-control editInput wrong "
                        : "form-control editInput"
                    }
                    onChange={(e) =>
                      this.setState({ SchoolName: e.target.value })
                    }
                    placeholder="Enter School Name"
                    value={this.state.SchoolName ? this.state.SchoolName : ""}
                  />
                  {this.state.error &&
                    this.state.error.schoolNameErr !== "" && (
                      <p className="editerror">
                        {" "}
                        {this.state.error.schoolNameErr}
                      </p>
                    )}
                </div>
                <div className="col-lg-5 col-11 col-md-5 col-sm-12 col-xs-12">
                  <label for="inputCountry" className="form-label editLabel">
                    Country <span className="red">*</span>
                  </label>
                  <CountryDropdown
                    value={this.state.country ? this.state.country : country}
                    onChange={(val) => this.selectCountry(val)}
                    className={
                      this.state.error && this.state.error.countryErr
                        ? "form-control editInput wrong "
                        : "form-control editInput"
                    }
                    id="validationServer04"
                    aria-describedby="validationServer04Feedback"
                  />

                  {this.state.error && this.state.error.countryErr ? (
                    <p className="editerror">{this.state.error.countryErr}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-5 col-11 col-md-5 col-sm-12 col-xs-12 ">
                  <label for="inputCity" className="form-label editLabel">
                    City <span className="red">*</span>
                  </label>
                  <RegionDropdown
                    country={country}
                    value={region !="" ? region : this.state.region2}
                    onChange={(val) => this.selectRegion(val)}
                    className={
                      this.state.error && this.state.error.cityErr
                        ? "form-control editInput wrong "
                        : "form-control editInput"
                    }
                    id="validationServer04"
                    aria-describedby="validationServer04Feedback"
                    // value={(e) => this.setState({ City: e.target.value })}
                  />

                  {this.state.error && this.state.error.cityErr ? (
                    <p className="editerror">{this.state.error.cityErr}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-5 col-11 col-md-5 col-sm-12 col-xs-12 ">
                  <label for="bdaymonth" className="form-label editLabel ">
                    From <span className="red">*</span>
                  </label>
                  <input
                    type="date"
                    id="bdaymonth"
                    className="form-control editInput"
                    onChange={(e) => this.setState({ From: e.target.value })}
                    value={this.state.From ? this.state.From : ""}
                  />

                  {/* {this.state.error.fromErr !== "" &&
                    this.state.error.fromErr.map((name) => (
                      <p className='editerror d-inline' key={name}>
                        {name} <span />
                      </p>
                    ))} */}
                  {this.state.error && this.state.error.fromErr ? (
                    <p className="editerror">{this.state.error.fromErr}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div class="col-lg-5 col-11 col-md-5 col-sm-12 col-xs-12">
                  <label for="bdaymonth" className="form-label editLabel ">
                    To <span className="red">*</span>
                  </label>
                  <input
                    type="date"
                    id="bdaymonth"
                    className="form-control editInput "
                    onChange={(e) => this.setState({ To: e.target.value })}
                    value={this.state.To ? this.state.To : ""}
                  />
                  {/* {this.state.error.toErr !== "" &&
                    this.state.error.toErr.map((name, i) => (
                      <p className='editerror d-inline' key={i}>
                        {name} <span />
                      </p>
                    ))} */}
                  {this.state.error && this.state.error.toErr ? (
                    <p className="editerror d-inline">
                      {" "}
                      {this.state.error.toErr}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div class="col-lg-5 col-11 col-md-5 col-sm-12 col-xs-12 ">
                  <label for="inputTerm" className="form-label editLabel">
                    Credential URL
                  </label>
                  <input
                    type="text"
                    className={
                      this.state.error && this.state.error.credErr
                        ? "form-control editInput wrong "
                        : "form-control editInput "
                    }
                    id="fullname"
                    onChange={(e) =>
                      this.setState({ SchoolUrl: e.target.value })
                    }
                    value={this.state.SchoolUrl ? this.state.SchoolUrl : ""}
                    placeholder="Enter Credential URL"
                  />
                  {this.state.error && this.state.error.credErr !== "" && (
                    <p className="editerror"> {this.state.error.credErr}</p>
                  )}
                </div>
                <div className="col-lg-5 col-11 col-md-5 col-sm-12 col-xs-12  ">
                  <label
                    htmlFor="files"
                    className="form-control editInput uploadBtn d-flex "
                  >
                    {this.state.UrlName ? this.state.UrlName : "Upload"}
                    {this.state.UrlName ? (
                      <FiCheck className="uploadIcon ms-auto " />
                    ) : (
                      <FiUpload className="uploadIcon ms-auto " />
                    )}
                    <input
                      className="form-control editInput"
                      hidden
                      type="file"
                      id="files"
                      onChange={(e) => this.handleUpload(e)}
                    />
                  </label>

                  {this.state.error && this.state.error.creddErr ? (
                    <p className="editerror">{this.state.error.creddErr}</p>
                  ) : (
                    ""
                  )}
                </div>
                {this.props.match.params.id ? (
                  <div class="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end mt-5 ">
                    <button
                      // type={this.handleDelete}
                      class="btn deleteBtn me-2 my-2  shadow-none  "
                      onClick={() => this.handleDelete()}
                      value="deleted"
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      class="btn updateBtn shadow-none my-2 "
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div class="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end mt-5">
                    <Link
                      class="btn me-2 my-2 cancelBtn shadow-none"
                      to="/Profile"
                    >
                      Cancel
                    </Link>
                    <button type="submit" class="btn doneBtn shadow-none my-2 ">
                      Add
                    </button>
                  </div>
                )}
              </div>
            </LoadingOverlay>
          </form>
        </div>
        <Footer2 />
      </div>
    );
  }
}
// export default EducationForm;
