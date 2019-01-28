import React from 'react';
import {Link} from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <h1 className="display-4 text-center">Page Not Found!!!</h1>
            <Link to='/' className="btn btn-link text-center">Take Me Back</Link>
        </div>
    );
};

export default Page404;