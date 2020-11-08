import React from "react"
import Header from './Header'
import Body from './Body'

class Main extends React.Component {
  render () {
    return (
      <div>
        <h2>Hello, World from Main Component!</h2>
        <Header />
        <Body />        
      </div>
    );
  }
};

export default Main