import React, { Component } from 'react';
import ProductHistory  from '../productHistory/ProductHistory';
class Equipments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility:false,
      productId:1
    }
    this.toggleVisibility = this.toggleVisibility.bind(this)

  }

    toggleVisibility() {
      this.setState({visibility:false})
      // console.log("bhupi")
    }

  render() {
    return (
      <div id="content" className='container'>
        

        {this.state.visibility?
        <ProductHistory productId={this.state.productId}
        contract={this.props.contract}
        products={this.props.products}
        toggleVisibility={this.toggleVisibility}/>
        
        :null}
        
        <h2>Equipments </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td onClick={()=>this.setState({visibility:true, productId:product.id})} style={{cursor:"pointer"}}>{product.name}</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased
                      ? <button className='btn btn-success'
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                             console.log(event.target.name)
                            this.props.requestProduct(event.target.name)
                          }}
                        >
                          Request
                        </button>
                      : <button>

                      </button>
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>&nbsp;</p>


        
        
      </div>
    );
  }
}

export default Equipments;
