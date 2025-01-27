import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import EditNav from "./EditNav";

// import { Redirect } from "react-router-dom";
import { axios } from "../../Api/axios";
// import { Link } from "react-router-dom";
import "../../layout/EditInfo.css";
import Footer2 from "../Common/Footer2";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

class AccountsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WebsitE: "",
      facebooK: "",
      instagraM: "",
      youtubE: "",
      linkediN: "",
      behancE: "",
      githuB: "",
      FormLoading: false,
    };
  }
  //get list
  componentDidMount = async () => {
    this.setState({ FormLoading: true });

    await axios
      .get("/W/student/profile/account")
      .then((aList) => {
        this.setState({
          WebsitE: aList.data.response.data[`0`].website,
          facebooK: aList.data.response.data[`0`].facebook,
          instagraM: aList.data.response.data[`0`].instagram,
          youtubE: aList.data.response.data[`0`].youtube,
          linkediN: aList.data.response.data[`0`].linkedin,
          behancE: aList.data.response.data[`0`].behance,
          githuB: aList.data.response.data[`0`].github,
          FormLoading: false,
        });
      })
      .catch((error) => {
        // if (error.response.data.status === 401) {
        //   sessionStorage.clear("token");
        //   sessionStorage.clear("status");
        //   this.setState({ loggedIn: false });
        //   window.location.reload();
        // }
        this.setState({ FormLoading: false });
      });
  };

  handleSubmit = async (e) => {
    this.setState({
      FormLoading: true,
    });
    e.preventDefault();
    var formBody = new FormData();

    const data = {
      website: this.state.WebsitE,
      facebook: this.state.facebooK,
      instagram: this.state.instagraM,
      youtube: this.state.youtubE,
      linkedin: this.state.linkediN,
      behance: this.state.behancE,
      github: this.state.githuB,
    };
    if (this.state.WebsitE !== "") {
      formBody.append("website", data.website);
    }
    if (this.state.facebooK && this.state.facebooK !== "") {
      formBody.append("facebook", data.facebook);
    }
    if (this.state.instagraM && this.state.instagraM !== "") {
      formBody.append("instagram", data.instagram);
    }
    if (this.state.youtubE && this.state.youtubE !== "") {
      formBody.append("youtube", data.youtube);
    }
    if (this.state.linkediN && this.state.linkediN !== "") {
      formBody.append("linkedin", data.linkedin);
    }
    if (this.state.behancE && this.state.behancE !== "") {
      formBody.append("behance", data.behance);
    }
    if (this.state.githuB && this.state.githuB !== "") {
      formBody.append("github", data.github);
    }

    return await axios({
      method: "post",
      url: "/W/student/profile/account",
      data: formBody,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => {
        this.setState({
          done: true,
          FormLoading: false,
        });
      })
      .catch((error) => {
        if (error.response.data.status === 401) {
          sessionStorage.clear("token");
          sessionStorage.clear("status");
          this.setState({ loggedIn: false });
          window.location.reload();
        }
        this.setState({
          FormLoading: false,
          error: {
            WebsitEErr: error.response.data.errors.website,
            facebooKErr: error.response.data.errors.facebook,
            instagraMErr: error.response.data.errors.instagram,
            youtubEErr: error.response.data.errors.youtube,
            linkediNErr: error.response.data.errors.linkedin,
            behancEErr: error.response.data.errors.behance,
            githuBErr: error.response.data.errors.github,
          },
        });
      });
  };
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />;
    }
    if (this.state.done === true) {
      return <Redirect to="/Profile" />;
    }
    return (
      <div>
        <div className="container ">
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
              <EditNav setactive={"Accounts"} />
              <div className="row">
                {/* old form */}
                <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 mt-3 mt-sm-0">
                  <label className="form-label editLabel">Website</label>
                  <input
                    value={this.state.WebsitE ? this.state.WebsitE : ""}
                    type="text"
                    className="form-control editInput"
                    // id="fullname"
                    onChange={(e) => this.setState({ WebsitE: e.target.value })}
                    placeholder="Enter Your Website "
                  />
                  <p className="editerror errMargin">
                    {this.state.error ? this.state.error.WebsitEErr : ""}
                  </p>
                </div>
                <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 mt-3 mt-sm-0">
                  <label className="   form-label editLabel accLable">
                    Facebook
                  </label>
                  <input
                    value={this.state.facebooK ? this.state.facebooK : ""}
                    type="text"
                    className="form-control editInput"
                    onChange={(e) =>
                      this.setState({ facebooK: e.target.value })
                    }
                    placeholder="Enter Facebook Profile"
                  />
                  <p className="editerror errMargin">
                    {this.state.error ? this.state.error.facebooKErr : ""}
                  </p>
                </div>
                <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 mt-3 mt-sm-0">
                  <label className="   form-label editLabel  accLable ">
                    Instagram
                  </label>
                  <input
                    value={this.state.instagraM ? this.state.instagraM : ""}
                    type="text"
                    className="form-control editInput "
                    // id="fullname"
                    onChange={(e) =>
                      this.setState({ instagraM: e.target.value })
                    }
                    placeholder="Enter Instagram Profile"
                  />
                  <p className="editerror errMargin">
                    {this.state.error ? this.state.error.instagraMErr : ""}
                  </p>
                </div>
                <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 mt-3 mt-sm-0">
                  <label className="   form-label editLabel accLable  ">
                    Youtube
                  </label>
                  <input
                    value={this.state.youtubE ? this.state.youtubE : ""}
                    type="text"
                    className="form-control editInput "
                    // id="fullname"
                    onChange={(e) => this.setState({ youtubE: e.target.value })}
                    placeholder="Enter Youtube Channel"
                  />
                  <p className="editerror errMargin">
                    {this.state.error ? this.state.error.youtubEErr : ""}
                  </p>
                </div>
                <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 mt-3 mt-sm-0">
                  <label className="   form-label editLabel  accLable ">
                    Linkedin
                  </label>
                  <input
                    value={this.state.linkediN ? this.state.linkediN : ""}
                    type="text"
                    className="form-control editInput "
                    // id="fullname"
                    onChange={(e) =>
                      this.setState({ linkediN: e.target.value })
                    }
                    placeholder="Enter Linkedin Profile"
                  />
                  <p className="editerror errMargin">
                    {this.state.error ? this.state.error.linkediNErr : ""}
                  </p>
                </div>
                <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 mt-3 mt-sm-0">
                  <label className="form-label editLabel accLable">
                    Behance
                  </label>
                  <input
                    value={this.state.behancE ? this.state.behancE : ""}
                    type="text"
                    className="form-control editInput"
                    onChange={(e) => this.setState({ behancE: e.target.value })}
                    placeholder="Enter Behance Profile"
                  />
                  <p className="editerror errMargin">
                    {this.state.error ? this.state.error.behancEErr : ""}
                  </p>
                </div>
                <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 mt-3 mt-sm-0">
                  <label className="me-5 form-label editLabel">Github</label>
                  <input
                    value={this.state.githuB ? this.state.githuB : ""}
                    type="text"
                    className="form-control editInput"
                    // id="fullname"
                    onChange={(e) => this.setState({ githuB: e.target.value })}
                    placeholder="Enter Github Profile"
                  />
                  <p className="editerror errMargin">
                    {this.state.error ? this.state.error.githuBErr : ""}
                  </p>
                </div>
              </div>

              <div class="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end mt-5">
                <Link class="btn me-2 my-2 cancelBtn shadow-none" to="/Profile">
                  Cancel
                </Link>
                <button
                  class="btn doneBtn shadow-none my-2 "
                  onClick={this.handleSubmit}
                >
                  Update
                </button>
              </div>
            </LoadingOverlay>
          </form>
        </div>
        <Footer2 />
      </div>
    );
  }
}
export default AccountsForm;
