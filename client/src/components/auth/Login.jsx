import React, { Component } from 'react';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    onChangeInput = (e) => {
        this.setState({[e.target.name]: e.target.value});

    }
    onLogin = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const loginUser = {
            email,
            password
        };
        console.log(loginUser);
    }
    render() {
        return (
            <div className="login">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your DevConnector account</p>
                    <form onSubmit={this.onLogin}>
                        <div className="form-group">
                        <input type="email" className="form-control form-control-lg" 
                        placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChangeInput} />
                        </div>
                        <div className="form-group">
                        <input type="password" className="form-control form-control-lg"
                         placeholder="Password" name="password" value={this.state.password} onChange={this.onChangeInput} />
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Login;