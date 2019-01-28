import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import {getCurrentProfile} from '../../store/actions/profileActions';
import {deletePost, addLike, removeLike} from '../../store/actions/postActions';


class PostItem extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDelete = (postId) => {
        this.props.deletePost(postId);
    }
    onAddLike = (postId) => {
        this.props.addLike(postId);
    }
    onRemoveLike = (postId) => {
        this.props.removeLike(postId);
    }
    findUserLike = (likes) => {
        const {auth} = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const {post, auth, showActions} = this.props;
        const {profile} = this.props.profile;
        return (
            <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                <Link to={`/profile/${profile ? profile.handle : ''}`}>
                    <img className="rounded-circle d-none d-md-block" src={auth.user.avatar}
                    alt="" />
                </Link>
                <br />
                <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                <p className="lead">{post.text}</p>
                {showActions ? (<span>
                    <button onClick={() => this.onAddLike(post._id)} type="button" className="btn btn-light mr-1">
                    <i className={classnames("fas fa-thumbs-up", {'text-info': this.findUserLike(post.likes)})}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                    </button>
                    <button onClick={() => this.onRemoveLike(post._id)} type="button" className="btn btn-light mr-1">
                        <i className="text-secondary fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                        Comments
                    </Link>
                    {post.user === auth.user.id ? (
                        <button onClick={() => this.onDelete(post._id)} type="button" className="btn btn-danger mr-1">
                        <i className="fas fa-times" />
                    </button>
                ) : ''}
                </span>) : null}
                </div>
            </div>
        </div>
        );

    }
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    
});
export default connect(mapStateToProps,
                {getCurrentProfile, deletePost,
                addLike, removeLike})(PostItem);