import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import {getPost} from '../../store/actions/postActions';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentFeed from './CommentFeed';


class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }
    render() {
        const {post, loading} = this.props.post;
        let postContent;
        if(post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />;
        } else {
            postContent  =  (<div>
                                <PostItem post={post}  showActions={false} />
                                <CommentForm postId={post._id} />
                                <CommentFeed postId={post._id} comments={post.comments} />
                            </div>
                            );
           
        }
        return (
            <div className="post">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <Link to="/post-feed" className="btn btn-light mb-3">
                        Back To Feed
                    </Link>
                    {/* <!-- Post Item --> */}
                    {postContent}
                    
                   </div>
                </div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);