import React, { Component } from 'react';
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import propsTypes from 'prop-types';
import {connect} from 'react-redux';
import {userLogin} from '../../store/actions/authActions';
import {withRouter} from 'react-router-dom';
import InputText from '../common/TextInput';
class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    } 
    onChangeInput = (e) => {
        this.setState({[e.target.name]: e.target.value});

    }
    onLogin = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const userData = {
            email,
            password
        };
        this.props.userLogin(userData);
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="login">
            <ToastContainer autoClose={2000} />
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your DevConnector account</p>
                    <form onSubmit={this.onLogin}>
                        <InputText 
                            type='email'
                            error={errors.email}
                            placeholder='Email Address'
                            name='email'
                            value={this.state.email}
                            onChange={this.onChangeInput}

                         />
                        <InputText 
                            type='password'
                            error={errors.password}
                            placeholder='Password'
                            name='password'
                            value={this.state.password}
                            onChange={this.onChangeInput}

                         />
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

Login.propTypes =  {
    userLogin: propsTypes.func.isRequired,
    auth: propsTypes.object.isRequired,
    errors: propsTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps, {userLogin})(withRouter(Login));