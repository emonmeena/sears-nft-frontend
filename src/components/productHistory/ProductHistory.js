import React, { Component } from 'react';
import './ProductHistory.css'

class ProductHistory extends Component {
	constructor(props) {
    super(props)
    this.state = {
      
       ProductTransactionCount:0,
      ProductTransaction:[]
    }


  }

	async componentWillMount(){

		  const ProductTransactionCount = await this.props.contract.methods.getProductTransactionCount(this.props.productId).call({ from: this.state.account })
      this.setState({ ProductTransactionCount })
      console.log(": " + ProductTransactionCount)
      for (var i = 1; i <= ProductTransactionCount; i++) {
        const trans = await this.props.contract.methods.getProductTransaction(this.props.productId,i).call({ from: this.state.account })
        this.setState({
          ProductTransaction: [...this.state.ProductTransaction, trans]
        })
      }
	}
  render() {
  	// console.log(this.props.productId)
    return (
        <div className='product-history-container'>
            <div className='product-history-close' onClick={ this.props.toggleVisibility}></div>
        
        <h2>Product transaction history </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">From</th>
              
              <th scope="col">To</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            { this.state.ProductTransaction.map((transaction, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{this.props.products[transaction[0]-1].name}</th>
                  <td>{transaction[1]}</td>
                  <td>{transaction[2]}</td>
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

export default ProductHistory;