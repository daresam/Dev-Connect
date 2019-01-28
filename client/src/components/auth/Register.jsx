import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { registerUser} from '../../store/actions/authActions';
import propsTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.min.css';
import TextInput from '../common/TextInput';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }
    onChangeInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password, password2} = this.state;
        const newUser = {
            name,
            email,
            password,
            password2
        };
       
        this.props.registerUser(newUser, this.props.history);
    }
    render() {
        const {errors} = this.state;
        
        return (
           
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your DevConnector account</p>
                    <form  onSubmit={this.onSubmit}>
                        <TextInput 
                            error={errors.name}
                            placeholder='Name'
                            name='name'
                            value={this.state.name}
                            onChange={this.onChangeInput}
                            
                        />
                        <TextInput 
                            type='email'
                            error={errors.email}
                            placeholder='Email'
                            name='email'
                            value={this.state.email}
                            onChange={this.onChangeInput}
                            
                        />
                        <TextInput 
                            type='password'
                            error={errors.password}
                            placeholder='Password'
                            name='password'
                            value={this.state.password}
                            onChange={this.onChangeInput}
                            
                        />
                        <TextInput 
                            type='password'
                            error={errors.password2}
                            placeholder='Password'
                            name='password2'
                            value={this.state.password2}
                            onChange={this.onChangeInput}
                            
                        />
                        <input type="submit" className="btn btn-info btn-block my-5" />
                        
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerUser: propsTypes.func.isRequired,
    auth: propsTypes.object.isRequired,
    errors: propsTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));