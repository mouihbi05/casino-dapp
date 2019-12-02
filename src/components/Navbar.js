import React, { Component } from 'react';


class Navbar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar navbar-inverse">
            <div className="navbar-header">
               <a className="navbar-brand"> IPFS Arweave Bridge</a>
            </div>
                    {/* <ul className="nav navbar-nav">
                       <li className="navbar-item">
                         <Link to="/data" className="nav-link">Get Data</Link>
                       </li>
                    </ul> */}
              </nav>
         );


    }
}
 
export default Navbar 