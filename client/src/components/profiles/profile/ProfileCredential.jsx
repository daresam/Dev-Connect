import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class ProfileCredential extends Component {
    render() {
        const {profile} = this.props;
        const experiences = profile.experience.map((exp, i) => (
            <li key={i} className="list-group-item">
                <h4>{exp.company}</h4>
                <p><Moment format="YYYY-MM-DD">{exp.from}</Moment> 
                &nbsp; - &nbsp;
                {exp.to === "" ? "Present" : (<Moment format="YYYY-MM-DD">{exp.to}</Moment>)}</p>
                <p>
                    <strong>Position:</strong> {exp.title}
                </p>
                <p>
                    <strong>Description:</strong> {exp.description}</p>
            </li>
        )) ;
        const educations = profile.education.map((edu, i) => (
            <li key={i} className="list-group-item">
                <h4>{edu.school}</h4>
                <p><Moment format="YYYY-MM-DD">{edu.from}</Moment> 
                &nbsp; - &nbsp;
                {edu.to === "" ? "Present" : (<Moment format="YYYY-MM-DD">{edu.to}</Moment>)}</p>
                <p>
                    <strong>Degree: </strong>{edu.degree}</p>
                <p>
                    <strong>Field Of Study: </strong>{edu.fieldOfStudy}</p>
                    <p>
                    <strong>Description:</strong> {edu.description}</p>
            </li>
        ))
        return (
            <div>
                <div className="row">
                <div className="col-md-6">
                <h3 className="text-center text-info">Experience</h3>
                <ul className="list-group">
                    {experiences}
                </ul>
                </div>
                <div className="col-md-6">
                <h3 className="text-center text-info">Education</h3>
                <ul className="list-group">
                   {educations}
                </ul>
                </div>
            </div>
            </div>
        );
    }
}

ProfileCredential.propTypes = {
    profile: PropTypes.object.isRequired

};

export default ProfileCredential;