import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextArea from '../common/TextArea';
import PropTypes from 'prop-types';
import {addPost} from '../../store/actions/postActions';


class PostForm extends Component {
    state = {
        text: '',
        errors: {}
    };

    componentWillReceiveProps(nextProp) {
        if(nextProp.errors) {
            this.setState({errors: nextProp.errors})
        }
    }

    onChangeInput = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (e) => {
        e.preventDefault();

        const {user} = this.props.auth;
        const newPost = {
            name: user.name,
            avatar: user.avatar,
            text: this.state.text
        }
        this.props.addPost(newPost);
        this.setState({text: ''});
    }
    render() {
        const { errors} = this.props;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Somthing...
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <TextArea
                            name='text'
                            placeholder='Create Post'
                            value={this.state.text}
                            onChange={this.onChangeInput}
                            error={errors.text}                        
                        />
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors

});

export default connect(mapStateToProps, {addPost})(PostForm);