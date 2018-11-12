import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClike(e) {
    this.props.deleteAccount();
  }

  render() {
    // Sure that Profile Not Null
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading === true) {
      dashboardContent = <Spinner />;
    } else {
      // if Profile has Data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              welcome{" "}
              <Link to={`/profile/${profile.handle}`}> {user.name} </Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            {/*  To Delete experience and education */}
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClike.bind(this)}
              className="btn btn-danger"
            >
              {" "}
              Delete My Accoount{" "}
            </button>
          </div>
        );
      } else {
        // User Log but Has no Profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              welcome {user.name}
              <p>You Don't have Profile!</p>
              <Link to="create-profile" className="btn btn-lg btn-info">
                Make it Now
              </Link>
            </p>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequierd,
  deleteAccount: PropTypes.func.isRequierd,
  auth: PropTypes.object.isRequierd,
  profile: PropTypes.object.isRequierd
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
