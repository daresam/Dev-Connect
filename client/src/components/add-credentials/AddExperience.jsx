import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import {addExperience} from '../../store/actions/profileActions';

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            to: '',
            from: '',
            description: '',
            disabled: false,
            current: false,
            location: '',
            errors: {}

        }

    }

    componentDidMount() {
    }

    onChangeInput = (e) => {
        this.setState({[e.target.name]: e.target.value});   
    }
    onCheck = () => {
        this.setState(prevState => ({
            current: !prevState.current,
            disabled: !prevState.disabled,
        }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        const expData = {
            company: this.state.company,
            location: this.state.location,
            title: this.state.title,
            description: this.state.description,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
        }
        this.props.addExperience(expData, this.props.history);
    }

    render() {
        const {errors} = this.props;
        return (
            <div className='add-experience'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className='btn btn-light' >
                            <i className='fas fa-arrow-alt-circle-left'></i> Go back
                            </Link>
                            <h1 className='display-4 text-center'>Add  Experience</h1>
                            <p className='lead text-center'>Add any developer/programming positions that you have had in the past</p>
                            <small className='d-block pb-3'>* = required field</small>

                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                    name='title'
                                    placeholder=' * Job Title'
                                    value={this.state.title}
                                    onChange={this.onChangeInput}
                                    error={errors.title}
                                />
                                <TextInput 
                                    name='company'
                                    placeholder='* Company'
                                    value={this.state.company}
                                    onChange={this.onChangeInput}
                                    error={errors.company}
                                />
                                <TextInput 
                                    name='location'
                                    placeholder='Location'
                                    value={this.state.location}
                                    onChange={this.onChangeInput}
                                />
                                <h6>From Date: * </h6>
                                <TextInput 
                                    name='from'
                                    type='date'
                                    placeholder='from'
                                    value={this.state.from}
                                    onChange={this.onChangeInput}
                                    error={errors.from}
                                />
                                <h6> To Date: </h6>
                                <TextInput 
                                    name='to'
                                    type='date'
                                    placeholder='to'
                                    value={this.state.to}
                                    onChange={this.onChangeInput}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className='form-check mb-4'>
                                    <input
                                     type="checkbox"
                                     className='form-check-input'
                                     name='current'
                                     value={this.state.current}
                                     onChange={this.onCheck}
                                     id='current'

                                     /> 
                                     <label htmlFor="current" className='form-check-label'>Current Job</label>
                                </div>
                                <TextArea 
                                    name='description'
                                    placeholder='Job Description'
                                    info='Some of your responsabilities, etc'
                                    value={this.state.description}
                                    onChange={this.onChangeInput}
                                />
                                <input 
                                    type="submit"
                                    value="Submit"
                                    className='btn btn-info btn-block mt-4'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));