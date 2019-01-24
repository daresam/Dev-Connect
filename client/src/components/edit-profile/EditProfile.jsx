import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';
import InputGroup from '../common/InputGroup';
import {createProfile, getCurrentProfile} from '../../store/actions/profileActions';
import isEmpty from '../../utils/isEmpty';


class EditProfile extends Component {
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

    componentDidMount() {
        this.props.getCurrentProfile();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring back Skills Array to CSV
            const skillsCSV = profile.skills.join(',');

            // If profile doesn't exist, set to sring
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';

            // Set component fields this.state.
            this.setState({
                skills: skillsCSV,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                githubusername: profile.githubusername,
                handle: profile.handle,
                bio: profile.bio,
                twitter: profile.social.twitter,
                facebook: profile.social.facebook,
                instagram: profile.social.instagram,
                youtube: profile.social.youtube,
                linkedin: profile.social.linkedin,
            })
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
                        <Link to='/dashboard' className='btn btn-light' >
                            <i className='fas fa-arrow-alt-circle-left'></i> Go back
                            </Link>
                            <h1 className="display-4 text-center">
                            Edit Your Profile
                            </h1>
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
                                <button type='submit' className='btn btn-info btn-block'>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));