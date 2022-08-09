import React, { Component } from 'react';
class productHistory extends Component {
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
  	console.log("boom")
    return (
      <div >
      {this.state.ProductTransaction}

      </div>
    );
  }
}

export default productHistory;