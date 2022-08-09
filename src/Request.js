import React, { Component } from 'react';

class Request extends Component {

  render() {
    return (
      <div  className='container'>
       
        <h2>Requests </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
           { this.props.requestCount>0
                      ? 
                      
          <tbody id="productList">
           { this.props.request.map((req, key) => {
              return(
                 <tr className='align-items-center'>
               
                  <th scope="row">{key+1}</th>
                  <td>{
                    this.props.products[req.productID-1].name}</td>
                  <td>{req.owner}</td>
                  <td>
                    { req.productID>0
                      ? <div className='d-flex flex-row-reverse'><button  
                         style={{padding:"0.2rem 1rem",borderRadius:"0.5rem 0.5rem 0.5rem/0.5rem 0.5rem",border:"none",cursor:"pointer",background: "#1DB92C",fontWeight:"400",color:"white"}}
                          
                          name={req.productID}
                          onClick={(event) => {
                            console.log(event.target.name)
                            const _k=key+1;
                            this.props.purchaseProduct(_k)
                          }}
                        >
                          Accept
                        </button>
                        <button classname="button btn-reject"
                          style={{marginRight:'20px',padding:"0.2rem 1rem",borderRadius:"0.5rem 0.5rem 0.5rem/0.5rem 0.5rem",border:"none",cursor:"pointer",background: "#FF3434",fontWeight:"400",color:"white"}}
                          name={req.productID}
                          onClick={(event) => {
                            console.log(event.target.name)
                            const _k=key+1;
                            this.props.deleteRequest(_k)
                          }}
                        >
                          Reject
                        </button>
                        </div>
                        
                      : null
                    }
                    </td>
                    
                  
                </tr>




                
              )
            })}
               
              
          </tbody>

            :null}
        </table>
        
      </div>
    );
  }
}

export default Request;
