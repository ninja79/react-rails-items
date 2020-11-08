import React from "react"
import AllItems from './Items/AllItems'
import NewItem from './Items/NewItem'

class Body extends React.Component {
  render () {
    return (
      <div className="Body">
        <h2>Hello, World from Body Component!</h2>
        <NewItem/>        
        <AllItems/>
      </div>
    );
  }
};

export default Body