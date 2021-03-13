import React, { Component } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "../../layout/EditInfo.css";
import Footer2 from "../Common/Footer2";
import { Redirect } from "react-router-dom";
import { axios } from "../../Api/axios";
// import { Link } from "react-router-dom";
import EditNav from "./EditNav";

class Interest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      id: 0,
      interests: [],
      error: {},
    };
  }
  async componentDidMount() {
    if (this.props.match.params.id) {
      await axios
        .get(`/W/student/profile/interest/${this.props.match.params.id}`)
        .then((res) => {
          this.setState({
            interests: res.data.response.data.interests,
            id: res.data.response.data.id,
            interest: res.data.response.data.interest,
          });
          console.log(res.data.response.data.interests);
        })
        .catch((error) => {
          if (error.response.data.status === 401) {
            sessionStorage.clear("token");
            sessionStorage.clear("status");
            this.setState({ loggedIn: false });
            window.location.reload();
          }
        });
    }

    console.log(this.props.match.params.id);
  }

  handleSubmiInterest = async (e) => {
    e.preventDefault();
    const data = {
      id: this.state.id,
      interests: [],
    };
    this.state.interests.forEach((element) => {
      data.interests.push({ interest: element });
    });
    //   await axios
    //     .post("/W/student/profile/interest", data)
    //     .then((response) => {
    //       this.setState({
    //         loggedIn: true,
    //       });
    //       console.log(response.data.response.data);
    //     })
    //     .catch((error) => {
    //       if (error.response.data.status === 401) {
    //         sessionStorage.clear("token");
    //         sessionStorage.clear("status");
    //         this.setState({ loggedIn: false });
    //         window.location.reload();
    //       }
    //       this.setState({
    //         error: {
    //           // interestsErr: error.response.data.errors.interests,
    //           // interestlErr: error.response.data.errors.interest,
    //         },
    //       });
    //       console.log(error.response.data.errors.message);
    //       // console.log(err.response.data.errors.interests);
    //     });
    // };
    if (this.props.match.params.id) {
      await axios
        .post(`/W/student/profile/interest/${this.props.match.params.id}`, data)
        .then((response) => {
          this.setState({
            loggedIn: true,
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
            error: {
              // interestsErr: error.response.data.errors.interests,
            },
          });
        });
    } else {
      await axios
        .post("/W/student/profile/interest", data)
        .then((response) => {
          this.setState({
            loggedIn: true,
          });
          console.log(response.data.response.data);
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
              interestsErr: error.response.data.errors.interests,
            },
          });
          console.log(error.response.data.errors.interests);
        });
    }
  };
  // handleDeleteInterest = async (e) => {
  //   await axios
  //     .delete(`/W/student/profile/interest/${this.props.match.params.id}`)
  //     .then((response) => {
  //       this.setState({
  //         loggedIn: true,
  //       });
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         this.setState({
  //           loggedIn: false,
  //           error: true,
  //         });
  //       }
  //       window.location.reload();
  //     });
  // };

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/Profile" />;
    }
    return (
      <div>
        <div className="container ">
          <EditNav setactive={"Interest"} />
          <div>
            <form className="row g-3 mb-3" onSubmit={this.handleSubmiInterest}>
              {/* <hr className="hrSkills ms-2 col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12" /> */}
              <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12">
                <label for="inputRegNum" className="form-label editLabel">
                  Intrests
                </label>
                <ReactTag
                  className="editLabel"
                  tags={(e) => this.setState({ interests: e })}
                  value={this.state.interests}
                />
                {/* <p>{this.state.interests}</p> */}
                {this.state.error && this.state.error.interestsErr ? (
                  <p className="editerror">{this.state.error.interestsErr}</p>
                ) : (
                  ""
                )}
              </div>

              {this.props.match.params.id ? (
                <div class="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end">
                  <button
                    // onClick={() => this.handleDeleteInterest()}
                    type="submit"
                    class="btn deleteBtn me-2 shadow-none "
                  >
                    Delete
                  </button>
                  <button type="submit" class="btn updateBtn shadow-none">
                    Update
                  </button>
                </div>
              ) : (
                <div className="col-lg-10 col-11 col-md-10 col-sm-12 col-xs-12 d-flex justify-content-end ">
                  <a
                    type="button"
                    className="btn me-2 cancelBtn shadow-none "
                    href="/Profile"
                  >
                    Cancel
                  </a>
                  <button type="submit" className="btn doneBtn shadow-none">
                    Add
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <Footer2 />
      </div>
    );
  }
}
export default Interest;

class ReactTag extends Component {
  state = {
    tags: [],
  };
  setTags = (e) => {
    this.setState({ tags: e });
    this.props.tags(e);
  };

  render() {
    return (
      <ReactTagInput
        tags={this.state.tags}
        editable={true}
        removeOnBackspace={true}
        onChange={(newTags) => this.setTags(newTags)}
      />
    );
  }
}
