import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteEducation} from '../../store/actions/profileActions';
import Moment from 'react-moment';

class Education extends Component {
    onDeleteEducation = (id) => {
        this.props.deleteEducation(id);
    }
    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{edu.from}</Moment>
                    &nbsp; - &nbsp;
                     {edu.to === "" ? "Present" : (<Moment format='YYYY/MM/DD'>{edu.ro}</Moment>)}
                </td>
                <td>
                <button onClick={() => this.onDeleteEducation(edu._id)} type='button' className="btn btn-danger">
                    Delete
                </button>
                </td>
            </tr>
        ));
        return (
            <div>
            <h4 className="mb-2">Education Credentials</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Degree</th>
                  <th>Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {education}
              </tbody>
            </table>
          </div>
        );
    }
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, {deleteEducation})(Education);