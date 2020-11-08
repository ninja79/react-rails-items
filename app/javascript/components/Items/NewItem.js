import React from "react"
import axios from 'axios'

class NewItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    
    this.handleClick = this.handleClick.bind(this);
  }  

  handleClick(event) {
    var name = this.refs.name.value;
    var description = this.refs.description.value;
    console.log('NewItem.handleClick, passing to onSubmitNewItem', {name}, {description});
    this.props.onSubmitNewItem({name, description});
  }
 
  render() {
    return (
      <div>
          <input ref='name' placeholder='Enter the name of the item' />
          <input ref='description' placeholder='Enter a description' />
          <button onClick={this.handleClick}>Submit</button>
        </div>
        );
   }
};

export default NewItem
