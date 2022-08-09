import React from 'react'

export default function UserTransaction(props) {
    console.log(props.transaction)
  return (
    <div className='container'>
        
        <h2>Transaction history </h2>
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
            { props.transaction.map((transaction, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{props.products[transaction[0]-1].name}</th>
                  <td>{transaction[1]}</td>
                  <td>{transaction[2]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>&nbsp;</p>


        
        
      </div>
  )
}
