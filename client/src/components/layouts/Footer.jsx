import React, { Component } from 'react';

class Footer extends Component {
    render() {
        const date = new Date();
        return (
            <footer className="bg-dark text-white mt-5 p-4 text-center footer">
                         Copyright &copy; {date.getFullYear()} Dev Connector
            </footer>
        );
    }
}

export default Footer;