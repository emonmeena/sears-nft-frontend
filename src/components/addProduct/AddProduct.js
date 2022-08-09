import React, { Component } from 'react';

class AddProduct extends Component {

  render() {
    return (
      <div id="content" className='container'>
        <h2>Add Equipments</h2>
        <form className='d-flex flex-column align-items-center w-100' onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          this.props.createProduct(name)
        }}>
          <div className="form-group mr-sm-2 w-100 my-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control w-100"
              placeholder="Product Name"
              
              required />
          </div>
         
          <button type="submit" className="btn btn-primary" style={{alignSelf:"flex-end"}}>Add Product</button>
        </form>
       
      </div>
    );
  }
}

export default AddProduct;
