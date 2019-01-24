import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteExperience} from '../../store/actions/profileActions';
import Moment from 'react-moment';

class Experience extends Component {
    

    onDeleteExperience = (id) => {
        this.props.deleteExperience(id);
    }
    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                   <Moment format='YYYY/MM/DD'>{exp.from}</Moment>  
                   &nbsp; - &nbsp;
                    {exp.to === "" ? 'Present' : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
                </td>
                <td>
                    <button type='button' className="btn btn-danger" onClick={() => this.onDeleteExperience(exp._id)} >
                    Delete
                    </button>
                </td>
            </tr>
        ));
        return (
                <div>
                <h4 className="mb-2">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th />
                        </tr>
                    </thead>
                    <tbody>
                        {experience}
                    </tbody>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,

};

export default connect(null, {deleteExperience})(Experience);