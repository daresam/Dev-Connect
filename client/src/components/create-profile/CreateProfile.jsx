import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';
import InputGroup from '../common/InputGroup';
import {createProfile} from '../../store/actions/profileActions';

class CreateProfile extends Component {
    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        errors: {},
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            youtube: this.state.youtube,
            linkedin: this.state.linkedin,
        };
        this.props.createProfile(profileData, this.props.history)
    }
    render() {
        const {errors} = this.state;

        // select options for status
        const options = [
            {label: '* Select Professional Status', value: 0},
            {label: 'Developer', value: 'Developer'},
            {label: 'Junior Developer', value: 'Junior Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Manager', value: 'Manager'},
            {label: 'Student or Learning', value: 'Student or Learning'},
            {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
            {label: 'Intern', value: 'Intern'},
            {label: 'DeveOtherloper', value: 'Other'}
        ];
        let displaySocials = '';
        if(this.state.displaySocialInputs) {
            displaySocials = (
                <div>
                    <InputGroup
                    name='facebook'
                    placeholder='Facebook URL'
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                    icon='fab fa-facebook'
                />
                <InputGroup
                    name='linkedin'
                    placeholder='Linkedin URL'
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                    icon='fab fa-linkedin'
                />
                <InputGroup
                    name='instagram'
                    placeholder='Instagram URL'
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                    icon='fab fa-instagram'
                />
                <InputGroup
                    name='youtube'
                    placeholder='Youtube URL'
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                    icon='fab fa-youtube'
                />
                <InputGroup
                    name='twitter'
                    placeholder='Twitter URL'
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                    icon='fab fa-twitter'
                />
                </div>
            );
        };
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="ro">
                        <div className="colmd-8 m-auto">
                            <h1 className="display-4 text-center">
                            Create Your Profile
                            </h1>
                            <p className="lead text-center">
                            Let's get some information to make your profile stand out!
                            </p>
                            <small className="d-block pb-3"><span className="text-danger">*</span> = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                name='handle'
                                placeholder='* Profile Handle'
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info='A unique profile for your URL: Your Fullname, comapny Name, nickname'
                                />
                                <SelectInput 
                                    name='status'
                                    value={this.state.status}
                                    placeholder='* Status'
                                    info='Give us an idea of where you are at in your career'
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                />
                                <TextInput
                                    name='company'
                                    placeholder=' Comppany'
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info='Could be your own company or one you work for'
                                />
                                <TextInput
                                    name='website'
                                    placeholder='Website'
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info='Could be your own or a company website'
                                />
                                <TextInput
                                    name='location'
                                    placeholder=' Location'
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info='City & state suggested (eg. Boston, MA)'
                                />
                                <TextInput
                                    name='skills'
                                    placeholder='* Skills'
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
                                />
                                <TextInput
                                    name='githubusername'
                                    placeholder='* Github Username'
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info='If you want your latest repos and a Github link, include your username'
                                />
                                <TextArea
                                    name='bio'
                                    placeholder=' A short bio about yourself'
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info='Tell us a little about yourself'
                                />
                                <div className="mb-3">
                                    <button onClick={() => this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }))} type='button' className='btn btn-light'>Add Social Network Links</button>
                                    <span className='text-muted'>Optional</span>
                                </div>
                                {displaySocials}
                                <button type='submit' className='btn btn-info btn-block'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));