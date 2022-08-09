import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbarswitch from '../navbar/Navbarswitch'

import Equipments from '../equipments/Equipments'
import Request from '../../Request'
import AddProduct from '../addProduct/AddProduct'

class Main extends Component {

  render() {
    return (
      <div >
      
      <Router>
      <Navbarswitch />
      <Routes>
      <Route exact path="/" element={<Equipments
       
        products={this.props.products}
        requestProduct={this.props.requestProduct}
        requestCount={this.props.requestCount}
        request={this.props.request}
        contract={this.props.contract}
        purchaseProduct={this.props.purchaseProduct} /> }/>
        
      
      <Route path="/request" element={
        <Request
        products={this.props.products}
        requestProduct={this.props.requestProduct}
        requestCount={this.props.requestCount}
        request={this.props.request}
        deleteRequest={this.props.deleteRequest}
        purchaseProduct={this.props.purchaseProduct} />}/>
      
      <Route path="/add" element={
        <AddProduct 
        createProduct={this.props.createProduct}/>}/>
       
      
      </Routes>
    </Router>
      
        
      </div>
    );
  }
}

export default Main;
