import React, { Component } from "react";
import isEmpty from "../../validations/is_empty";
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get user First Name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skills map
    const skills = profile.skills.map((skill, key) => (
      <div key={key} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    const bio = isEmpty(profile.bio) ? null : (
      <div>
        <h3 className="text-center text-info">
          {firstName}
          's Bio
        </h3>
        <p className="lead text-center">
          <span>{profile.bio}</span>
        </p>
        <hr />
      </div>
    );
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {bio}
            <h3 className="text-center text-info">Skills</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
