import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
    render() {
        const {posts} = this.props;
        return (
            posts.map(post => (
                <div key={post._id} className="posts">
                    {/* <!-- Post Item --> */}
                    <PostItem post={post} />
                </div>
    
            ))
        );

    }
};

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
};

export default PostFeed;