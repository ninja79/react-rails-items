import React from "react"
import Header from './Header'
import Body from './Body'

class Main extends React.Component {
  render () {
    return (
      <div className="container">
        <Header />
        <Body />        
      </div>
    );
  }
};

export default Main