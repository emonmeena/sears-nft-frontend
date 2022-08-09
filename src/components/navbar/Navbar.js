import React, { Component } from 'react';
import './Navbar.css'
class Navbar extends Component {

  render() {
    return (
      <nav className="Navbar-container fs-4 py-2 px-2 d-flex align-items-center">
        <div className="nav-heading " >
          NFT Ticketing Use-Case
       </div>
        <h1 className="account">{this.props.account}</h1>
      </nav>
    );
  }
}

export default Navbar;
