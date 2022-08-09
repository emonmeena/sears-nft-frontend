import React, { Component } from 'react';
import './navswitch.css'
import {  Link } from "react-router-dom";

class Navbarswitch extends Component {

  render() {
    return (

      <div className='container navswitch'>
      <div className='options d-flex justify-content-around'>
         <Link to = "/"  className='button  btn'>Equipments</Link>
         < Link to = "/request" className='button btn'>Requests</Link>
         < Link to = "/add" className='button btn'>Add product</Link>
      </div>

  </div>
    );
  }
}

export default Navbarswitch;
