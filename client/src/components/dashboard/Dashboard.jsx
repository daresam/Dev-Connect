import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../store/actions/profileActions';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
    state = {

    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {

    }

    

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;
        let dashboardContent;
        if(profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            // check if user logged in and has profile
            if(Object.keys(profile).length > 0) {
                dashboardContent = <h4>TODO Display profile</h4>
            } else {
                // user logged in but no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">welcome {user.name}</p>
                        <p>You have not setup your profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create profile</Link>
                    </div>
                )
            }
        }
        return (
            <div className='dashboard'>
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
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);